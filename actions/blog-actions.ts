"use server";

import { validatedAction } from "@/lib/action-helpers";
import { PostCreateSchema } from "@/lib/types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DOMPurify from "isomorphic-dompurify";

export const createPostAction = validatedAction(PostCreateSchema, async (data) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return { error: "Трябва да сте влезли в профила си, за да публикувате." };
  }

  try {
    // 1. SANITIZE THE HTML
    // DOMPurify automatically strips <script>, <object>, <embed>,
    // and dangerous attributes like 'onload=' or 'javascript:href'.
    // It leaves safe tags like <p>, <b>, <h1>, and <img> completely intact.
    const cleanContent = DOMPurify.sanitize(data.content, {
      ALLOWED_TAGS: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "p",
        "a",
        "ul",
        "ol",
        "nl",
        "li",
        "b",
        "i",
        "strong",
        "em",
        "strike",
        "code",
        "hr",
        "br",
        "div",
        "table",
        "thead",
        "caption",
        "tbody",
        "tr",
        "th",
        "td",
        "pre",
        "img",
        "mark",
      ],
      ALLOWED_ATTR: [
        "href",
        "name",
        "target",
        "src",
        "class",
        "alt",
        "title",
        "style",
        "target",
        "class",
        "style",
        "data-align",
        "data-width",
      ],
      ALLOWED_URI_REGEXP:
        /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    });

    // Optional: Prevent users from submitting an empty post that only contains empty tags (like "<p></p>")
    const textOnly = cleanContent.replace(/<[^>]*>?/gm, "").trim();
    if (textOnly.length === 0 && !cleanContent.includes("<img")) {
      return { error: "Съдържанието не може да бъде празно." };
    }

    // 2. SAVE TO DATABASE
    await prisma.posts.create({
      data: {
        title: data.title,
        content: cleanContent,
        authorId: session.user.id,
      },
    });
  } catch (error) {
    console.error("Create Post error:", error);
    return { error: "Възникна грешка при запазването на публикацията." };
  }

  // 3. Redirect back to feed
  redirect("/?publish-success=true");
});

export async function getPosts() {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export async function deletePostAction(postId: string) {
  // 1. Verify user is logged in
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return { error: "Не сте влезли в профила си." };
  }

  try {
    // 2. Fetch the post to check ownership
    const post = await prisma.posts.findUnique({
      where: { id: postId },
      select: { authorId: true }, // We only need the authorId for this check
    });

    if (!post) {
      return { error: "Публикацията не е намерена." };
    }

    // 3. SECURITY: Ensure the logged-in user is the actual author
    if (post.authorId !== session.user.id) {
      return { error: "Нямате права да изтриете тази публикация." };
    }

    // 4. Delete the post
    await prisma.posts.delete({
      where: { id: postId },
    });
  } catch (error) {
    console.error("Delete post error:", error);
    return { error: "Възникна грешка при изтриването." };
  }

  // 5. Redirect back to home with a success message (placed outside try/catch)
  redirect("/?delete-success=true");
}
