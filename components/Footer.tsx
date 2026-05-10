export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy border-t border-brand-accent/20 text-white pt-4 pb-8">
      <div className="max-w-7xl mx-auto px-2">
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
            © {currentYear} STUDSU SYSTEM. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
            <span>Build Status:</span>
            <span className="text-emerald-500 animate-pulse">Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
