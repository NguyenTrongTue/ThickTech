export default function InputText({ children, addClass, ...props }) {
  return (
    <input
      {...props}
      className={
        "p-1.5 block w-full rounded-md border-gray-400 shadow-sm focus:outline-none focus:ring-slate-400 focus:ring-[3px] ring-1 sm:text-sm" +
        addClass
      }
    />
  );
}
