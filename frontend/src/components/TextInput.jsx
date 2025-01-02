import React from "react";
import classNames from "classnames";
const TextInput = React.forwardRef(
  ({ name, error, type = "text", ...rest }, ref) => {
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    const inputClass = classNames("input w-full h-10", {
      "input-error": error,
    });

    return (
      <>
        <label className="label p-2">
          <span className="text-base label-text">{formattedName}</span>
        </label>
        <input
          ref={ref}
          className={inputClass}
          name={name}
          type={type}
          {...rest}
        />
      </>
    );
  }
);

TextInput.displayName = "TextInput";

export { TextInput };
