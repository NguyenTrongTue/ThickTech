import React from "react";

const ButtonOutline = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="font-medium tracking-wide py-2 px-6 sm:px-6 border border-red-500 text-red-500 bg-white-500 outline-none rounded-3xl capitalize hover:bg-red-500 hover:text-white transition-all"
    >
      {" "}
      {children}
    </button>
  );
};

export default ButtonOutline;
