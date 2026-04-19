export default function InputBox({ value, onChange }: any) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Ask anything..."
      className="w-full p-4 rounded-xl text-black mb-4"
    />
  );
}