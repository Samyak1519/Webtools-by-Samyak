import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";

function QRPreview({ qrValue, downloadQR }) {
  if (!qrValue) return null;

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <div className="bg-white border border-zinc-200 rounded-xl p-6">
        <QRCodeCanvas
          id="qrCodeCanvas"
          value={qrValue}
          size={200}
          includeMargin
        />
      </div>

      <button
        onClick={downloadQR}
        className="
        flex
        items-center
        gap-2
        text-sm
        font-medium
        border border-zinc-200
        px-4
        py-2
        rounded-lg
        hover:bg-zinc-50
        transition
        cursor-pointer
        "
      >
        <Download size={16} />
        Download QR
      </button>
    </div>
  );
}

export default QRPreview;
