import { QrCode } from "lucide-react";

function Navbar() {
  return (
    <div className="w-full border-b border-white/40 backdrop-blur bg-white/70">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-zinc-900">
          <QrCode size={22} />
          <h2 className="font-medium text-xl">QR Generator</h2>
        </div>

        <div className="text-sm text-zinc-500">Free QR code tool</div>
      </div>
    </div>
  );
}

export default Navbar;
