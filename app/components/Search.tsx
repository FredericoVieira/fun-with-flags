import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type SearchProps = {
  count: number;
  search: string;
  setSearch: (search: string) => void;
};

const Search = ({ count, search, setSearch }: SearchProps) => {
  return (
    <div className="w-1/3">
      <div className="relative mb-2">
        <input
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Search by country name..."
        />
        <span className="absolute inset-y-0 right-4 flex items-center">
          <MagnifyingGlassIcon className="size-4" />
        </span>
      </div>
      <span className="text-gray-600 text-sm pl-4">
        Showing {count} countries
      </span>
    </div>
  );
};

export default Search;
