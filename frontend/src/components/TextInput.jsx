import React from "react";

const TextInput = React.forwardRef(({ name, type = "text", ...rest }, ref) => {
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <>
      <label className="label p-2">
        <span className="text-base label-text">{formattedName}</span>
      </label>
      <input
        ref={ref}
        className="input input-bordered w-full h-10"
        name={name}
        type={type}
        {...rest}
      />
    </>
  );
});

TextInput.displayName = "TextInput";

export { TextInput };
