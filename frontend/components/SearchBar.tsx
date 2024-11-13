"use client";

import { useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
}

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
    // TODO: Redirect to search results page
  };

  const clearSearch = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 relative max-w-md w-full">
      <div className="relative flex items-center">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <AiOutlineSearch className="w-5 h-5" />
        </label>

        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
          >
            <AiOutlineClose className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
}
