import { GoogleSignInButton } from "./GoogleSignInButton";

export default function AuthPage(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{props.title}</h1>

        {props.children}
        <GoogleSignInButton />
      </div>
    </div>
  );
}
