const FooterSection = () => {
  return (
    <footer className="relative py-12 bg-[#050505] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-white font-bold text-lg tracking-wider">CORTEX</span>
            <span className="text-red-500 font-bold text-lg">POEI</span>
          </div>
          <div className="flex items-center gap-6 font-mono text-xs text-white/30">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />SYSTEMS ONLINE</span>
            <span className="text-white/10">|</span>
            <span>v2.0.2026</span>
          </div>
          <div className="text-white/30 text-sm font-mono">© 2026 CORTEX POEI</div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;