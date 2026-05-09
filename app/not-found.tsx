import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stud SU | 404",
};

export default function NotFound() {
  return (
    <main className="min-h-screen text-white font-mono p-6 sm:p-12 md:p-24 flex flex-col justify-center items-center selection:bg-white selection:text-[#0000aa]">
      <div className="max-w-3xl w-full space-y-8 text-sm sm:text-base md:text-lg leading-relaxed">
        <div className="flex justify-center mb-12">
          <span className="bg-gray-300 text-[#0000aa] px-4 py-1 font-bold tracking-widest">
            СИСТЕМНА ГРЕШКА
          </span>
        </div>

        <p>
          Фатална грешка 404 възникна в{" "}
          <span className="bg-white text-[#0000aa] px-1">0xDEADC0DE</span> в STUDSU_ROUTER.
          Системата не успя да изпълни <code>exam()</code> и откри <code>NullPointerException</code>{" "}
          в мотивацията ти.
        </p>

        <div className="space-y-4 pl-4 md:pl-8">
          <p>
            * АКО ВИЖДАТЕ ТОЗИ ЕКРАН ЗА ПЪРВИ ПЪТ, ОПИТАЙТЕ СЕ ДА СЕ ВЪРНЕТЕ НА ПРЕДИШНАТА СТРАНИЦА.
          </p>
          <p>* АКО ТОЗИ ЕКРАН СЕ ПОЯВИ ОТНОВО, ИЗПЪЛНЕТЕ СЛЕДНИТЕ СТЪПКИ:</p>
          <ul className="list-disc pl-8 space-y-2">
            <li>ПРОВЕРЕТЕ ДАЛИ АДРЕСЪТ (URL) Е ИЗПИСАН ПРАВИЛНО.</li>
            <li>УВЕРЕТЕ СЕ, ЧЕ ТОВА, КОЕТО ТЪРСИТЕ СЪЩЕСТВУВА.</li>
            <li>ПОМОЛЕТЕ ПРЕПОДАВАТЕЛЯ СИ ЗА УДЪЛЖАВАНЕ НА КРАЙНИЯ СРОК ЗА ТОЗИ ЛИНК.</li>
          </ul>
        </div>

        <p className="pt-8">
          НАТИСНЕТЕ БУТОНА ПО-ДОЛУ, ЗА ДА ПРЕКРАТИТЕ ТЕКУЩАТА СЕСИЯ И ДА СЕ ВЪРНЕТЕ В БЕЗОПАСНОСТ.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 text-white hover:text-gray-300 transition-colors focus:outline-none"
          >
            <span className="animate-pulse opacity-0 group-hover:opacity-100">&gt;</span>
            <span className="border-b-2 border-transparent group-hover:border-gray-300 pb-0.5">
              ВРЪЩАНЕ_КЪМ_НАЧАЛОТО.EXE
            </span>
            <span className="inline-block w-2.5 h-5 bg-white animate-[pulse_1s_step-end_infinite]"></span>
          </Link>
        </div>
      </div>
    </main>
  );
}
