import { Button } from "@nextui-org/react";

export default function ButtonCustom({ children, className, ...props }) {
  return (
    <Button
      {...props}
      className={`flex flex-row items-center justify-center gap-2 px-3 py-2 text-white bg-slate-500 hover:bg-slate-700 rounded-md outline-double outline-slate-400 border-slate-600 hover:border-slate-700  ${className}`}
    >
      {children}
    </Button>
  );
}
