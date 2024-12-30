import React from "react";

const ButtonPrimary = ({ children, className }) => {
  return (
    <button
      className={
        "py-3 lg:py-4 px-12 lg:px-16 text-white font-semibold rounded-lg bg-red-500 hover:shadow-lg hover:bg-red-600 transition-all outline-none " +
        className
      }
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
