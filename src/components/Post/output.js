import React, { useState, useEffect } from 'react';
import EventCard from './card';

export default function PostOutput() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [cards, setCards] = useState([
    {
      author: "rzc24-nftbbg",
      category: "hive-173575",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nisi vitae ex accumsan gravida.",
      permlink: "a-job-without-a-job-description"
    },
    {
      author: "Jane Smith",
      category: "react",
      body: "Sed pulvinar augue vel leo commodo, nec interdum tortor viverra.",
      permlink: "https://example.com/card2"
    },
    {
      author: "Alice Johnson",
      category: "react",
      body: "Phasellus scelerisque velit eget velit placerat, a fermentum libero condimentum.",
      permlink: "https://example.com/card3"
    }
    // Add more default cards here if needed
  ]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  useEffect(() => {
    // Function to fetch cards from API
    const fetchCards = async () => {
      try {
        const response = await fetch(`https://intellihire-flask.onrender.com/posts?tag=${selectedTag}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cards');
        }
        const data = await response.json();
        setCards(data); // Update state with fetched cards
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards(); // Call the fetchCards function when the selectedTag changes
  }, [selectedTag]); // Include selectedTag as a dependency in useEffect

  const filteredCards = cards.filter((card) =>
    card.category.includes(searchTerm) // Change to direct check since category is not an array
  ).filter((card) => selectedTag === '' || card.category === selectedTag); // Change to direct equality check

  return (
    <div className="bg-black text-white min-h-screen flex flex-wrap justify-center items-start p-4 mt-[80px]">
      <input
        type="text"
        placeholder="Search by tag"
        className="border border-gray-300 rounded-md px-3 py-2 mb-4 bg-gray-800 text-white"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select
        value={selectedTag}
        onChange={handleTagChange}
        className="border border-gray-300 rounded-md px-3 py-2 mb-4 bg-gray-800 text-white"
      >
        <option value="Trending">Trending</option>
        <option value="Hot">Hot</option>
        <option value="Active">Active</option>
        <option value="Created">Created</option>
        <option value="Promoted">Promoted</option>
        <option value="Blog">Blog</option>
      </select>
      {filteredCards.map((card, index) => (
        <EventCard key={index} author={card.author} category={card.category} body={card.body} permlink={card.permlink}/>
      ))}
    </div>
  );
};
