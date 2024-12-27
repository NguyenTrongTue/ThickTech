import React from "react";

const ClickOutside = ({ children, exceptionRef, onClick, className }) => {
  const wrapperRef = React.createRef();

  const handleClickListener = (event) => {
    let clickedInside = false;
    if (exceptionRef) {
      clickedInside =
        (wrapperRef.current && wrapperRef.current.contains(event.target)) ||
        (exceptionRef.current && exceptionRef.current === event.target) ||
        (exceptionRef.current && exceptionRef.current.contains(event.target));
    } else {
      clickedInside =
        wrapperRef.current && wrapperRef.current.contains(event.target);
    }

    if (!clickedInside) onClick();
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [exceptionRef, onClick]);

  return (
    <div ref={wrapperRef} className={`${className || ""}`}>
      {children}
    </div>
  );
};

export default ClickOutside;
