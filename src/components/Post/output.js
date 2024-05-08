import React, { useState, useEffect } from 'react';
import EventCard from './card';
import axios from 'axios';

export default function PostOutput() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('trending');
  const [cards, setCards] = useState([
    {
      author: "olujay",
      body: "<div class=\"text-justify\"> ... </div> --- <sub>All images belong to me</sub> Posted Using [InLeo Alpha](https://inleo.io/@olujay/diary-of-a-patriotic-corper-minding-my-business)",
      category: "hive-11060",
      permlink: "diary-of-a-patriotic-corper-minding-my-business"
    },
    {
      author: "mimidoo1",
      body: " ![](https://images.ecency.com/DQmVoq24vZcSNn4q1JmqK3p5JM4gHNz32LA97ysXwtxKcxN/865c3824_3ad6_46fe_9a97_ff85df6442b0.jpg) Web 3 jobs revolves around technologies like that of blockchain,decentralized finance (defi),decentralized applications ,and web3.0 protocols.these technologies offer different benefits to your society and leaving, Which includes the following 1. It provides data privacy which enables users to have more control over their personal data which reduces the risk of fraud and theft or unauthorized access by central authorities. 2. ⁠Financial inclusion:through decentralized finance,web 3 jobs helps us by supporting our financial services by traditional banking systems,fostering economic inclusion .web 3 jobs helps users to work and earn a better living. 3. ⁠Transparency and trust :web 3 jobs has facilitated our transparent and immutable record keeping,enhancing trust in transactions and interaction across different sectors which are supply chain management,and voting systems. 4. ⁠Ownership and Autonomy.decentralized platforms,different users have bigger autonomy over their digital identities,assets and content which reduces reliance o centralized intermediaries . In general,web 3 jobs offers benefits like keeping your personal information private,making financial services accessible to people,it makes transactions more transparent,Web 3 jobs is an exciting feild with a lot of great opportunities. One great thing about web jobs is the accessibility,a user can comfortably sit at home or in their office and do whatever work that he or she has to do . Image from pixabay ",
      category: "hive-167922",
      permlink: "web-3-jobs"
    },
    {
      author: "cancerdoctorus",
      body: "![Uploading Canadian Offshore Jobs 2024 With Temporary Foreign Worker Program (TFWP).png #70]() Canada’s robust oil and gas industry continues to offer lucrative opportunities for skilled workers from around the globe, especially in offshore roles. Canadian offshore jobs primarily involve roles in the oil and gas industry, as well as in renewable energy sectors like offshore wind farms. ## #### What are Offshore Jobs? Offshore jobs refer to positions that are based outside of a country’s territorial boundaries, typically involving work on oil rigs, ships, or other marine environments. **Types of Offshore Jobs Available in Canada in 2024** The Canadian offshore sector primarily focuses on the following roles: **Engineering:** Positions for petroleum, mechanical, and subsea engineers to design, install, and maintain offshore infrastructure. **Geoscientists:** Roles for geologists and geophysicists essential for exploration and resource evaluation. **Tradespeople:** Opportunities for welders, electricians, pipefitters, and others involved in construction, maintenance, and repair. **Rig** **Workers: **Jobs for drillers, derrick operators, and personnel operating the equipment. **Eligibility Criteria for Offshore Jobs via Canadian TFWP** 1# Valid Job Offer You need a valid job offer from a Canadian employer for an offshore role, which must comply with local labor standards. 2# Labour Market Impact Assessment (LMIA) Your employer must obtain a positive LMIA from Employment and Social Development Canada (ESDC), demonstrating the need for a foreign worker and the absence of Canadian candidates. 3# General Work Permit Requirements Additionally, you must fulfill the general criteria for a Canadian work permit: **Education:** Relevant educational qualifications for the offshore job. **Work** **Experience:** Sufficient experience in the relevant field. **Language** **Skills:** Proficiency in English or French. **Medical** **Exam:** May be required for physically demanding roles. **Background** **Check: **A clean criminal record is necessary.",
      category: "job",
      permlink: "canadian-offshore-jobs-2024-with"
    }
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
        const response = await axios.get(`https://intellihire-flask.onrender.com/posts?tag=${selectedTag}`);
        console.log(response.data);
        setCards(response.data)
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards(); // Call the fetchCards function when the selectedTag changes    
  }, [selectedTag]); // Include selectedTag as a dependency in useEffect

  // const filteredCards = cards.filter((card) =>
  //   card.category.includes(searchTerm) // Change to direct check since category is not an array
  // ).filter((card) => selectedTag === '' || card.category === selectedTag); // Change to direct equality check

  return (
    <div className="bg-black text-white min-h-screen flex flex-wrap justify-center items-start p-4 mt-[80px]">
      <input
        type="text"
        placeholder="Search by tag"
        className="border border-gray-300 rounded-md px-3 py-2 mb-4 bg-gray-800 text-white"
        value={selectedTag}
        disabled
      />
      <select
        value={selectedTag}
        onChange={handleTagChange}
        className="border border-gray-300 rounded-md px-3 py-2 mb-4 bg-gray-800 text-white"
      >
        <option value="trending">Trending</option>
        <option value="active">Active</option>
        <option value="created">Created</option>
        <option value="promoted">Promoted</option>
        <option value="blog">Blog</option>
      </select>
      {cards && cards.length > 0 && cards.map((card, index) => (
        <EventCard key={index} author={card.author} category={card.category} body={card.body} permlink={card.permlink}/>
      ))}
    </div>
  );
};
