export const TextInput = ({ name, type = "text", value, onChange }) => {
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <>
      <label className="label p-2">
        <span className="text-base label-text">{formattedName}</span>
      </label>
      <input
        placeholder={formattedName}
        className="input input-bordered w-full h-10"
        value={value}
        name={name}
        onChange={onChange}
        type={type}
      />
    </>
  );
};
