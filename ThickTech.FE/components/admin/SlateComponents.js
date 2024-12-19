import React from "react";

export const Button = ({ children, onMouseDown, className }) => (
  <button
    className={`p-2 text-sm bg-gray-200 rounded hover:bg-gray-300 ${className}`}
    onMouseDown={onMouseDown}
  >
    {children}
  </button>
);

export const Toolbar = ({ children }) => (
  <div className="mb-2 flex items-center">{children}</div>
);
