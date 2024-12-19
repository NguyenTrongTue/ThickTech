export default function ActionBtn({ children, className, color, ...props }) {
  return (
    <button
      {...props}
      className={`flex flex-row items-center justify-center gap-2 px-2 py-2 text-white bg-${color}-500 hover:bg-${color}-700 rounded-md outline-double  ${className}`}
    >
      {children}
    </button>
  );
}
