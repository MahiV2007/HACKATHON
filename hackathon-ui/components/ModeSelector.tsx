export default function ModeSelector({ mode, setMode }: any) {
  return (
    <select
      value={mode}
      onChange={(e) => setMode(e.target.value)}
      className="p-2 rounded text-black"
    >
      <option value="fast">⚡ Fast</option>
      <option value="balanced">⚖️ Balanced</option>
      <option value="accurate">🎯 Accurate</option>
    </select>
  );
}