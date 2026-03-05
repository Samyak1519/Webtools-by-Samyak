import { Link2 } from "lucide-react";

function QRInput({ link, setLink, generateQR }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      generateQR();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-start">
        <h3 className="text-lg font-semibold text-zinc-800">Create QR Code</h3>

        <p className="text-sm text-zinc-500">
          Paste the link you want to convert into a QR code
        </p>
      </div>

      <div className="relative">
        <Link2 size={18} className="absolute left-4 top-3.5 text-zinc-400" />

        <input
          type="text"
          placeholder="Paste your URL here..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          onKeyDown={handleKeyDown}
          className="
          w-full
          pl-11
          pr-4
          py-3
          text-sm
          bg-white
          border border-zinc-200
          rounded-xl
          outline-none
          focus:border-black
          transition
          "
        />
      </div>

      <button
        onClick={generateQR}
        className="cursor-pointer flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition"
      >
        ✨ Generate QR Code
      </button>
    </div>
  );
}

export default QRInput;
