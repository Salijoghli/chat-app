export const TabPanel = ({ label, children }) => (
  <>
    <input
      type="radio"
      name="tab"
      role="tab"
      className="tab text-lg font-semibold"
      aria-label={label}
      defaultChecked={label === "Friends"}
    />
    <div
      role="tabpanel"
      className="tab-content bg-base-100 border-base-300 rounded-box p-2"
    >
      {children}
    </div>
  </>
);
