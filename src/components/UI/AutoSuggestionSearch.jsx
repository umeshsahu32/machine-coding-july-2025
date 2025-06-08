import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";

const AutoSuggestionSearch = () => {
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [showRecipes, setShowRecipes] = useState(false);
  const [cache, setCache] = useState({});

  const debouncedInput = useDebounce(input, 500);

  const fetchData = async () => {
    if (cache[debouncedInput]) {
      setRecipes(cache[debouncedInput]);
      return;
    }
    const url = `https://dummyjson.com/recipes/search?q=${debouncedInput}`;
    const data = await fetch(url);
    const result = await data.json();
    setRecipes(result?.recipes);
    setCache((prev) => ({ ...prev, [debouncedInput]: result?.recipes }));
  };

  useEffect(() => {
    fetchData();
  }, [debouncedInput]);

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-4xl font-bold text-teal-700 mb-10">
        Auto Suggestion Search Bar
      </h1>
      <div>
        <input
          type="text"
          className="w-[400px] px-3 h-12 text-gray-900 text-xl bg-gray-200 border-2 border-gray-400 rounded-md focus:outline-teal-800"
          placeholder="Search Recipe..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowRecipes(true)}
          onBlur={() => setShowRecipes(false)}
        />
      </div>
      {showRecipes && (
        <div className="w-[400px] shadow-md rounded-md bg-gray-300 m-auto max-h-[400px] overflow-y-scroll mt-2">
          {recipes?.map((recipe) => {
            return (
              <span
                className="block text-left w-full p-2 text-md duration-200 transition-all cursor-pointer hover:bg-gray-500 hover:text-white"
                key={recipe.id}
              >
                {recipe.name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AutoSuggestionSearch;
