import React from "react";

const RadioButton = React.forwardRef(({ name }, ref) => {
  return (
    <div className="flex items-center justify-center gap-8">
      <label className="label cursor-pointer ">
        <span className="label-text">Male </span>
        <input
          type="radio"
          className="radio radio-primary mx-5"
          name={name}
          value="male"
          defaultChecked
          ref={ref}
        />
      </label>

      <label className="label cursor-pointer">
        <span className="label-text">Female </span>
        <input
          type="radio"
          className="radio radio-error mx-5"
          name={name}
          value="female"
          ref={ref}
        />
      </label>
    </div>
  );
});

RadioButton.displayName = "RadioButton";

export { RadioButton };
