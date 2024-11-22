import { useState, useEffect } from "react";
import axios from "axios";

const GroupList = () => {
  const [groupName, setGroupName] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [activeOption, setActiveOption] = useState("0");
  const [pageSize, setPageSize] = useState("25");
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [activeOptions, setActiveOptions] = useState([]);
  const [pageSizes, setPageSizes] = useState([]);

  // Fetch initial data and trigger the POST API
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get("http://119.40.87.9:5000/api/Group/List", {
          headers: {
            accept: "*/*",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFkbWluIiwiQWRtaW5BY2Nlc3MiOnRydWUsImFwcF9tZXRhZGF0YSI6IiIsImV4cCI6MTczNDA2ODA2OCwiaXNzIjoiR2VuUE9TIn0.hJRpOz-LTapjw97NfuoLpYjBDzck2yyX_7KNeu3rm74",
          },
        });

        const data = response.data.data;

        // Save dropdown and page size options
        setActiveOptions(data.availableActiveOptions || []);
        setPageSizes(data.availablePageSizes || []);

        // Prepare the payload for POST API
        const payload = {
          availablePageSizes: data.availablePageSizes || [],
          draw: data.draw || null,
          start: data.start || 0,
          length: data.pageSize || 25,
          searchGroupName: data.searchGroupName || groupName,
          searchVatNumber: data.searchVatNumber || vatNumber,
          searchActiveId: data.searchActiveId || activeOption,
          availableActiveOptions: data.availableActiveOptions || [],
        };

        // Call POST API with prepared payload
        fetchTableData(payload);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []); // Trigger only once on component mount

  // Function to call the POST API
  const fetchTableData = async (payload) => {
    try {
      const response = await axios.post("http://119.40.87.9:5000/api/Group/List", payload, {
        headers: {
          accept: "*/*",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFkbWluIiwiQWRtaW5BY2Nlc3MiOnRydWUsImFwcF9tZXRhZGF0YSI6IiIsImV4cCI6MTczNDA2ODA2OCwiaXNzIjoiR2VuUE9TIn0.hJRpOz-LTapjw97NfuoLpYjBDzck2yyX_7KNeu3rm74",
        },
      });

      // Update the table data with the response from POST API
      setTableData(response?.data?.data?.data || []);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const handleSearch = () => {
    // Prepare the payload for the POST API
    const payload = {
      searchGroupName: groupName,
      searchVatNumber: vatNumber,
      searchActiveId: activeOption,
      length: pageSize,
      start: (page - 1) * pageSize,
    };

    // Call the POST API with updated payload
    fetchTableData(payload);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);

    // Prepare the payload for the POST API
    const payload = {
      searchGroupName: groupName,
      searchVatNumber: vatNumber,
      searchActiveId: activeOption,
      length: pageSize,
      start: (newPage - 1) * pageSize,
    };

    // Fetch table data for the new page
    fetchTableData(payload);
  };


  console.log('tableData :>> ', tableData?.data);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">List of Groups</h1>

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
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

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
                  <img target="_blank" src={row.logoThumbnailUrl} alt="" className="w-6 h-6"/>
                </td>
                <td className="border border-gray-300 px-4 py-2">{row.name}</td>
                <td className="border border-gray-300 px-4 py-2">{row.vatNumber}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{row.active ? "✔️" : "❌"}</td>
                <td className="border border-gray-300 px-4 py-2">actions</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
        <div>
          <label htmlFor="pageSize" className="mr-2">
            Rows per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-3">Page {page}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupList;
