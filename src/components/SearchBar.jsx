import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const city = e.target.city.value.trim();
    if (city) {
      onSearch(city);
      e.target.city.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="relative flex items-center">
        <input
          type="text"
          name="city"
          placeholder="Search for a city..."
          className="w-full px-5 py-3.5 pl-12 
                    bg-white/10 hover:bg-white/20
                    text-white placeholder-blue-100/70
                    rounded-xl border border-white/20
                    focus:outline-none focus:bg-white/20
                    transition-all duration-200
                    text-lg"
        />
        <Search className="absolute left-4 w-5 h-5 text-blue-100/70" />

        <button
          type="submit"
          className="absolute right-2 px-4 py-2
                     bg-white/20 hover:bg-white/30
                     text-white font-medium
                     rounded-lg
                     transition-all duration-200
                     hover:shadow-lg
                     flex items-center gap-2
                     border border-white/10 hover:border-white/30"
        >
          Search
        </button>
      </div>
    </form>
  );
}
