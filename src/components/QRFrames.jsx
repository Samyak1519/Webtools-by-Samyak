function QRFrameControls({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  frameType,
  setFrameType,
}) {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Heading text"
        className="border p-2 rounded-lg"
      />

      <input
        type="text"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        placeholder="Subheading text"
        className="border p-2 rounded-lg"
      />

      <select
        value={frameType}
        onChange={(e) => setFrameType(e.target.value)}
        className="border p-2 rounded-lg"
      >
        <option value="none">No Frame</option>
        <option value="simple">Simple Frame</option>
        <option value="poster">Poster Style</option>
        <option value="minimal">Minimal Card</option>
      </select>
    </div>
  );
}

export default QRFrameControls;
