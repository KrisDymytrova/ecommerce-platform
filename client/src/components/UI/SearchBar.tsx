import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-80">
            <input
                type="text"
                placeholder="Search..."
                className="bg-transparent flex-grow focus:outline-none"
            />
            <Search size={20} className="text-gray-500 cursor-pointer hover:text-black" />
        </div>
    );
};

export default SearchBar;
