import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CompanyDashboard() {
    const [selectedList, setSelectedList] = useState('faceScore'); // Default selected list
    const [faceScoreSort, setFaceScoreSort] = useState([]);
    const [resumeScoreSort, setResumeScoreSort] = useState([]);
    const [speechScoreSort, setSpeechScoreSort] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/candidateList');
                const { faceScoreSort, resumeScoreSort, speechScoreSort } = response.data;
                setFaceScoreSort(faceScoreSort);
                setResumeScoreSort(resumeScoreSort);
                setSpeechScoreSort(speechScoreSort);
            } catch (error) {
                console.error('Error fetching sorted usernames:', error);
            }
        };

        fetchData();
    }, []);

    const handleListChange = (event) => {
        setSelectedList(event.target.value);
    };

    let selectedListData = [];
    if (selectedList === 'faceScore') {
        selectedListData = faceScoreSort;
    } else if (selectedList === 'resumeScore') {
        selectedListData = resumeScoreSort;
    } else if (selectedList === 'speechScore') {
        selectedListData = speechScoreSort;
    }

    return (
        <div className="max-w-4xl mx-auto mt-8 text-black">
            <h2 className="text-2xl font-bold mb-4">Sorted Usernames</h2>
            <div className="flex mb-4">
                <label htmlFor="list" className="mr-2">Select List:</label>
                <select id="list" value={selectedList} onChange={handleListChange} className="border rounded px-2 py-1">
                    <option value="faceScore">Face Score</option>
                    <option value="resumeScore">Resume Score</option>
                    <option value="speechScore">Speech Score</option>
                </select>
            </div>
            <div className="border rounded p-4 bg-gray-800 text-white">
                <h3 className="text-lg font-semibold mb-2">Sorted by {selectedList}</h3>
                <ul>
                    {selectedListData.map((username, index) => (
                        <li key={index} className="mb-1">{username}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
