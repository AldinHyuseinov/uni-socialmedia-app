import Image from "next/image";

export default function AuthPage(props: { title: string; children: React.ReactNode }) {
  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
      {/* LEFT COLUMN: Mascot and Text */}
      <div className="flex flex-col items-center flex-1 w-full max-w-xl text-white">
        <Image
          src="/mascot.svg"
          width={30}
          height={30}
          alt="Studsu Mascot"
          className="w-72 h-auto mx-auto lg:mx-0 mb-8 drop-shadow-2xl"
        />
        <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-wide leading-tight text-brand-cream text-center">
          Свързаност отвъд аудиторията
        </h1>
        <div className="space-y-1 font-bold text-sm tracking-wide text-blue-100 uppercase leading-relaxed text-center">
          <p>Място за споделяне на учебни материали,</p>
          <p>новини и идеи.</p>
          <p>Свързва хората в университета в една</p>
          <p>активна и подкрепяща общност.</p>
        </div>
      </div>

      {/* RIGHT COLUMN: Auth Form */}
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-black mb-8 uppercase text-white tracking-wider text-center lg:text-left">
          {props.title}
        </h2>
        {props.children}
      </div>
    </main>
  );
}
