export const downloadQRWithFrame = (qrCanvas) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const qrSize = 300;
  const padding = 40;

  canvas.width = qrSize + padding * 2;
  canvas.height = qrSize + padding * 2 + 60;

  // background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // title
  ctx.fillStyle = "#000";
  ctx.font = "bold 22px Inter, Arial";
  ctx.textAlign = "center";
  ctx.fillText("Scan this QR Code", canvas.width / 2, 35);

  // draw QR
  ctx.drawImage(qrCanvas, padding, 60, qrSize, qrSize);

  // footer
  ctx.font = "14px Inter, Arial";
  ctx.fillStyle = "#666";
  ctx.fillText(
    "Generated with QR Generator",
    canvas.width / 2,
    canvas.height - 20,
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
