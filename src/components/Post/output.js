import React, { useState, useEffect } from 'react';
import EventCard from './card';

export default function PostOutput() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [cards, setCards] = useState([
    {
      author: "John Doe",
      category: ["react", "javascript"],
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nisi vitae ex accumsan gravida.",
      permLink: "https://example.com/card1"
    },
    {
      author: "Jane Smith",
      category: ["react", "redux"],
      body: "Sed pulvinar augue vel leo commodo, nec interdum tortor viverra.",
      permLink: "https://example.com/card2"
    },
    {
      author: "Alice Johnson",
      category: ["react", "hooks"],
      body: "Phasellus scelerisque velit eget velit placerat, a fermentum libero condimentum.",
      permLink: "https://example.com/card3"
    },
    // Add more sample cards here if needed
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
        const response = await fetch('https://api.example.com/cards');
        if (!response.ok) {
          throw new Error('Failed to fetch cards');
        }
        const data = await response.json();
        setCards(data); // Update state with fetched cards
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards(); // Call the fetchCards function when the component mounts
  }, []); // Empty dependency array means this effect runs only once, on mount

  const filteredCards = cards.filter((card) =>
    card.category.some((tag) => tag.includes(searchTerm))
  ).filter((card) => selectedTag === '' || card.category.includes(selectedTag));

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
        <option value="">All Category</option>
        {Array.from(new Set(cards.flatMap(card => card.category))).map((tag, index) => (
          <option key={index} value={tag}>{tag}</option>
        ))}
      </select>
      {filteredCards.map((card, index) => (
        <EventCard key={index} author={card.author} tags={card.category} body={card.body} permLink={card.permLink}/>
      ))}
    </div>
  );
};
