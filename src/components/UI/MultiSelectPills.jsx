import { useEffect, useRef, useState } from "react";

const Pill = ({ image, text, onClick }) => {
  return (
    <span
      className="h-10 flex items-center mx-2 gap-1 bg-gray-600 text-white px-3 py-1 rounded-xl cursor-pointer"
      onClick={onClick}
    >
      <img className="h-full" src={image} alt={text} />
      <span>{text} &times;</span>
    </span>
  );
};

const MultiSelectPills = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  const inputRef = useRef(null);

  // https://dummyjson.com/users/search?q=Jo

  useEffect(() => {
    const fetchUsers = () => {
      setActiveSuggestion(0);
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }

      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => {
          console.error(err);
        });
    };

    fetchUsers();
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== user.id
    );
    setSelectedUsers(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestions([]);
    } else if (e.key === "ArrowDown" && suggestions?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestions.users.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp" && suggestions?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (
      e.key === "Enter" &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestions.users.length
    ) {
      handleSelectUser(suggestions.users[activeSuggestion]);
    }
  };

  return (
    <div className="flex -mt-80 flex-col gap-7 w-full">
      <h1 className="text-fuchsia-700 text-center text-4xl">
        Multi Select Pills
      </h1>
      <div className="relative flex">
        <div className="w-[60%] m-auto flex items-center flex-wrap gap-2 border-2 px-1 py-5 border-gray-400 rounded-2xl">
          {/* Pills */}
          {selectedUsers.map((user) => {
            return (
              <Pill
                key={user.email}
                image={user.image}
                text={`${user.firstName} ${user.lastName}`}
                onClick={() => handleRemoveUser(user)}
              />
            );
          })}
          {/* input field with search suggestions */}
          <div>
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search For a User..."
              onKeyDown={handleKeyDown}
              className="border-none outline-none h-12 w-auto bg-transparent text-xl px-4"
            />
            {/* Search Suggestions */}
            {suggestions?.users?.length > 0 && (
              <ul className="max-h-[350px] overflow-y-scroll list-none p-0 m-0 absolute bg-white border border-[#ccc]">
                {suggestions?.users?.map((user, index) => {
                  return !selectedUserSet.has(user.email) ? (
                    <li
                      className={`flex items-center gap-[10px] px-3 py-2 cursor-pointer border-b border-[#ccc] last:border-b-0 hover:bg-[#ccc] ${
                        index === activeSuggestion ? "bg-gray-600" : ""
                      }`}
                      key={user.email}
                      onClick={() => handleSelectUser(user)}
                    >
                      <img
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="h-5"
                      />
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                    </li>
                  ) : (
                    <></>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelectPills;
