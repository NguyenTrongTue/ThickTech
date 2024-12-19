import Link from "next/link";

export default function ButtonLink({
  children,
  className,
  color = "blue",
  ...props
}) {
  return (
    <Link
      {...props}
      className={`flex flex-row items-center justify-center p-2 text-white bg-${color}-600 hover:bg-${color}-700 rounded-md outline-double outline-${color}-400 border-${color}-600 ${className}`}
    >
      {children}
    </Link>
  );
}
