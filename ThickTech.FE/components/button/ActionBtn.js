import { Button } from "@nextui-org/react";

export default function ActionBtn({ children, className, color, ...props }) {
  return (
    <Button
      {...props}
      className={`flex flex-row items-center justify-center gap-2 px-3 py-1 text-white bg-${color}-500 hover:bg-${color}-700 rounded-md outline-double  ${className}`}
    >
      {children}
    </Button>
  );
}
