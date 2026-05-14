type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
};

export default function Input({
  label,
  type = "text",
  placeholder,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">

      <label className="text-sm text-slate-300">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-indigo-500 transition"
      />

    </div>
  );
}