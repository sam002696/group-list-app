import React from "react";

const TableComponent = ({ tableData }) => {
  return (
    <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">Logo</th>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">VAT Number</th>
          <th className="border border-gray-300 px-4 py-2">Active</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tableData.length > 0 ? (
          tableData.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  target="_blank"
                  src={row.logoThumbnailUrl}
                  alt=""
                  className="w-6 h-6"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{row.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.vatNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {row.active ? "✔️" : "❌"}
              </td>
              <td className="border border-gray-300 px-4 py-2">actions</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center text-gray-500 py-4">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableComponent;
