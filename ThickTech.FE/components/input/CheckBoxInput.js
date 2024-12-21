export function CheckboxInput({ ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-gray-500 text-xs"
        htmlFor="product-is-featured-product"
      >
        Is Featured Product <span className="text-red-500">*</span>{" "}
      </label>
      <select
        {...props}
        type="number"
        placeholder="Enter Sale Price"
        className="p-1.5 block w-full rounded-md border-gray-400 shadow-sm focus:outline-none focus:ring-slate-400 focus:ring-[3px] ring-1 sm:text-sm"
        required
      >
        <option value={"no"}>No</option>
        <option value={"yes"}>Yes</option>
      </select>
    </div>
  );
}
