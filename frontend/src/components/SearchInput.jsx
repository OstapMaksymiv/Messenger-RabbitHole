import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../zustand/useConversation";
import useGetConversations from "../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations,filteredConversations, setFilteredConversations } = useGetConversations();

  const handleChangeSearchedPerson = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearch(query);
  
    if (!query) {
      setFilteredConversations(filteredConversations); 
     
      return;
    }

    const newConversations = conversations.filter((conv) =>
  
      conv.username.toLowerCase().includes(query)
    );


    setFilteredConversations(newConversations);

    if (newConversations.length === 0) {
      toast.error("No such user found!");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={handleChangeSearchedPerson}
      />
      <button type="button" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </div>
  );
};

export default SearchInput;
