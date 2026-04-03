import { useState } from "react";

const SearchBar = ({ setQuery }) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    setQuery(input);
  };

  return (
    <div className="flex justify-center mb-6 gap-2 px-2">
      <input
        type="text"
        value={input}
        placeholder="Search movies..."
        className="w-full sm:w-3/4 md:w-1/2 p-3 rounded-full bg-gray-800 text-white border border-gray-700"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />

      <button
        onClick={handleSearch}
        className="bg-red-500 px-4 py-2 rounded-full text-white"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;