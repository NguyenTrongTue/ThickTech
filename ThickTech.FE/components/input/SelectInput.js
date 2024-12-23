export function SelectInput({ children, label, options, className, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} <span className="text-red-500">*</span>{" "}
      </label>
      <select
        {...props}
        className={
          className +
          " p-2 block w-full rounded-md border-gray-400 shadow-sm focus:outline-none focus:ring-slate-400 focus:ring-[3px] ring-1 sm:text-sm"
        }
      >
        <option value="">Chọn {label} ...</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
