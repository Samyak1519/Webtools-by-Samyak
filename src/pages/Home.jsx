import { useRef, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import QRInput from "../components/QRInput";
import QRPreview from "../components/QRPreview";

function Home() {
  const [link, setLink] = useState("");
  const [qrValue, setQrValue] = useState("");

  const previewRef = useRef(null);

  const generateQR = () => {
    if (!link) return;

    setQrValue(link);

    // Scroll to QR preview smoothly
    setTimeout(() => {
      previewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const downloadQR = () => {
    const qrCanvas = document.getElementById("qrCodeCanvas");

    if (!qrCanvas) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const qrSize = 260;
    const padding = 40;
    const titleHeight = 60;
    const footerHeight = 40;

    canvas.width = qrSize + padding * 2;
    canvas.height = qrSize + padding * 2 + titleHeight + footerHeight;

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = "#111";
    ctx.font = "bold 22px Inter, Arial";
    ctx.textAlign = "center";
    ctx.fillText("Scan this QR Code", canvas.width / 2, 35);

    // Draw QR
    ctx.drawImage(qrCanvas, padding, titleHeight, qrSize, qrSize);

    // Footer
    ctx.font = "14px Inter, Arial";
    ctx.fillStyle = "#666";
    ctx.fillText(
      "Generated with QR Generator",
      canvas.width / 2,
      canvas.height - 10,
    );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-20">
        <Header />

        <div className="mt-16 flex flex-col items-center gap-6">
          {/* INPUT CARD */}
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl shadow-md p-8">
            <QRInput link={link} setLink={setLink} generateQR={generateQR} />
          </div>

          {/* PREVIEW CARD */}
          {qrValue && (
            <div
              ref={previewRef}
              className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl shadow-md p-8"
            >
              <h3 className="text-sm font-medium text-zinc-500 mb-6 text-center">
                Poster Preview
              </h3>
              <QRPreview qrValue={qrValue} downloadQR={downloadQR} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
