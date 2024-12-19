export default function TestArea({ children, addClass, ...props }) {
  return (
    <textarea
      {...props}
      className={
        "flex-1 mt-1 p-2 block w-full rounded-md border-gray-400 shadow-sm focus:outline-none focus:ring-slate-400 focus:ring-[3px] ring-1 sm:text-sm" +
        addClass
      }
    ></textarea>
  );
}
