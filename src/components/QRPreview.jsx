import { Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import QRCode from "qrcode";

function QRPreview({ qrValue }) {
  const [frameEnabled, setFrameEnabled] = useState(false);

  const [title, setTitle] = useState("Scan this QR Code");
  const [subtitle, setSubtitle] = useState("Open the link");

  if (!qrValue) return null;

  // DOWNLOAD WITHOUT FRAME
  const downloadWithoutFrame = () => {
    const canvas = document.getElementById("qrCodeCanvas");

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");

    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // DOWNLOAD WITH FRAME
  const downloadWithFrame = async () => {
    const width = 750;
    const height = 1000;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    // background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // TITLE
    ctx.fillStyle = "#111";
    ctx.font = "bold 100px Inter, Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const titleY = 120;
    ctx.fillText(title, width / 2, titleY);

    // QR SIZE
    const qrSize = 400;

    const qrCanvas = document.createElement("canvas");

    await QRCode.toCanvas(qrCanvas, qrValue, {
      width: qrSize,
      margin: 2,
    });

    const qrX = (width - qrSize) / 2;
    const qrY = 300;

    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

    // SUBTITLE
    ctx.fillStyle = "#666";
    ctx.font = "50px Inter, Arial";

    const subtitleY = qrY + qrSize + 120;

    ctx.fillText(subtitle, width / 2, subtitleY);

    // download
    const link = document.createElement("a");
    link.download = "qr-poster.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-5 w-full">
      {/* TITLE + SUBTITLE INPUTS */}

      {frameEnabled && (
        <div className="w-full flex flex-col gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Frame title"
            className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />

          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Frame subtitle"
            className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />
        </div>
      )}

      {/* QR PREVIEW */}

      {!frameEnabled && (
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <QRCodeCanvas
            id="qrCodeCanvas"
            value={qrValue}
            size={200}
            includeMargin
          />
        </div>
      )}

      {frameEnabled && (
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-center shadow-sm max-w-[320px] w-full">
          <h3 className="text-2xl font-semibold mb-4">{title}</h3>

          <div className="flex justify-center">
            <QRCodeCanvas
              id="qrCodeCanvas"
              value={qrValue}
              size={200}
              includeMargin
            />
          </div>

          <p className="text-md font-semibold text-zinc-700 mt-4">{subtitle}</p>
        </div>
      )}

      {/* ADD FRAME BUTTON */}

      {!frameEnabled && (
        <button
          onClick={() => setFrameEnabled(true)}
          className="text-sm border border-zinc-200 px-4 py-2 rounded-lg hover:bg-zinc-50 transition"
        >
          Add Frame
        </button>
      )}

      {/* DOWNLOAD BUTTONS */}

      {!frameEnabled && (
        <button
          onClick={downloadWithoutFrame}
          className="flex items-center gap-2 text-sm font-medium border border-zinc-200 px-4 py-2 rounded-lg hover:bg-zinc-50 transition"
        >
          <Download size={16} />
          Download QR
        </button>
      )}

      {frameEnabled && (
        <div className="flex gap-3">
          <button
            onClick={downloadWithoutFrame}
            className="flex items-center gap-2 text-sm font-medium border border-zinc-200 px-4 py-2 rounded-lg hover:bg-zinc-50 transition"
          >
            <Download size={16} />
            Download Without Frame
          </button>

          <button
            onClick={downloadWithFrame}
            className="flex items-center gap-2 text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <Download size={16} />
            Download With Frame
          </button>
        </div>
      )}
    </div>
  );
}

export default QRPreview;
