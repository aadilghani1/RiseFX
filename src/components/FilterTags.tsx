import { FC } from "react";

const FilterTags: FC<{ label: string; onClear: () => void }> = ({
  label,
  onClear,
}) => {
  return (
    <div className="bg-gray-100 text-gray-900 px-3 py-1 w-fit rounded-md font-semibold flex items-center">
      {label}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 cursor-pointer"
        onClick={onClear}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};

export default FilterTags;
