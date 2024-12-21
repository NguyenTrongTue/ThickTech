export default function InputText({ children, className, label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} <span className="text-red-500">*</span>{" "}
      </label>
      <input
        {...props}
        className={
          "p-1.5 block w-full rounded-md border-gray-400 shadow-sm focus:outline-none focus:ring-slate-400 focus:ring-[3px] ring-1 sm:text-sm" +
          (className ? " " + className : "")
        }
      />
    </div>
  );
}
