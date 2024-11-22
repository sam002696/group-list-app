import React from "react";

const GroupListFilter = ({
  groupName,
  setGroupName,
  vatNumber,
  setVatNumber,
  activeOption,
  setActiveOption,
  activeOptions,
  onSearch,
}) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <input
        type="text"
        placeholder="Group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-1/3"
      />
      <input
        type="text"
        placeholder="VAT number"
        value={vatNumber}
        onChange={(e) => setVatNumber(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-1/3"
      />
      <select
        value={activeOption}
        onChange={(e) => setActiveOption(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-1/4"
      >
        {activeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default GroupListFilter;
