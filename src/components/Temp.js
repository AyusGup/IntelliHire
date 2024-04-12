import React from "react";

export default function Temp() {
    const call = () => {
        fetch('http://localhost:3001/login', {
        method: "GET",
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            window.location.href = data.url;
        })
        .catch(error => console.error('Error:', error));
    };

    return <div onClick={()=>{
        call();
    }}>Login</div>;
}