import { Download } from "lucide-react";
import QRCode from "qrcode";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

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
    const width = 1400;
    const height = 1800;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    // BACKGROUND
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, width, height);

    // POSTER BORDER
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#0A0E15";

    ctx.beginPath();
    ctx.roundRect(40, 40, width - 80, height - 80);
    ctx.stroke();

    const padding = 120;
    const qrSize = 700;

    // TEXT WRAP FUNCTION
    const wrapText = (ctx, text, maxWidth) => {
      const words = text.split(" ");
      const lines = [];
      let line = "";

      words.forEach((word) => {
        const testLine = line + word + " ";
        const testWidth = ctx.measureText(testLine).width;

        if (testWidth > maxWidth && line !== "") {
          lines.push(line);
          line = word + " ";
        } else {
          line = testLine;
        }
      });

      lines.push(line);
      return lines;
    };

    // TITLE
    ctx.fillStyle = "#111";
    ctx.font = "bold 100px Inter, Arial";
    ctx.textAlign = "center";

    const titleLines = wrapText(ctx, title, width - padding * 2);

    const titleStartY = 300;

    titleLines.forEach((line, i) => {
      ctx.fillText(line, width / 2, titleStartY + i * 90);
    });

    // QR CARD BACKGROUND
    const qrCardSize = qrSize + 120;
    const qrCardX = (width - qrCardSize) / 2;
    const qrCardY = 500;

    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.08)";
    ctx.shadowBlur = 30;

    ctx.fillRect(qrCardX, qrCardY, qrCardSize, qrCardSize);

    ctx.shadowBlur = 0;

    // QR CODE
    const qrCanvas = document.createElement("canvas");

    await QRCode.toCanvas(qrCanvas, qrValue, {
      width: qrSize,
      margin: 2,
    });

    const qrX = (width - qrSize) / 2;
    const qrY = qrCardY + 60;

    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

    // SUBTITLE
    ctx.fillStyle = "#666";
    ctx.font = "75px Inter, Arial";

    const subtitleLines = wrapText(ctx, subtitle, width - padding * 2);

    const subtitleStartY = qrCardY + qrCardSize + 220;

    subtitleLines.forEach((line, i) => {
      ctx.fillText(line, width / 2, subtitleStartY + i * 80);
    });

    // DOWNLOAD IMAGE
    const link = document.createElement("a");
    link.download = "qr-framed.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      <div className="mt-1 flex flex-col items-center gap-5 w-full">
        {/* TITLE + SUBTITLE INPUTS */}
        {frameEnabled && (
          <div className="w-full flex flex-col gap-4">
            {/* TITLE FIELD */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700">Title</label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Scan this QR Code"
                className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500"
              />
            </div>

            {/* SUBTITLE FIELD */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700">
                Subtitle
              </label>

              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Open the link"
                className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500"
              />
            </div>
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

            <p className="text-md font-semibold text-zinc-700 mt-4">
              {subtitle}
            </p>
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
    </>
  );
}

export default QRPreview;
