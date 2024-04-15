import React, { useState } from "react";
import imag from './pic.png';
const EventCard = (props) => {
  

  return (
    <>
  {/* Main-box */}
  <div className="bg-[#0000004d] p-3 w-[90vw] min-h-40 flex my-[20px] mx-[5vw] text-[#f0f8ff] backdrop-blur rounded-[25px] shadow-[0px_0px_20px_#8f8f8f8f] items-center max-[768px]:flex-wrap max-[768px]:justify-center">
    <img
      className="bg-no-repeat shrink-0 xl:w-[25rem] lg:w-80 md:w-60 sm:w-[25rem] w-[100%] md:mr-3 rounded-3xl"
      src={imag}
      alt="event image"
      width={50}
      height={50}
    />

    {/* About */}
    <div className="w-3/5 lg:w-90 md:w-90  max-[768px]:w-[90%] self-start">
      <div className="font-retrog text-center md:text-left lg:text-3xl  md:text-3xl sm:text-3xl text-4xl mt-0 max-[640px]:my-2 max-[640px]:flex justify-center">
        {props.author}
      </div>

      <div className=" font-ticketing xl:text-xl sm:text-md max-[640px]:text-md">
        {/* {props.data?.description} */}
       
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: props.body.slice(0, 600) }}
          ></div>
        
      </div>

      <br/>
      <div className="flex w-full justify-between md:justify-start items-center">
        <div className="w-fit text-2">
          <a
            className="font-bold text-xl underline text-yellow-400 pr-5 "
            href={"https://hive.blog/"+props.category+"/@"+props.author+"/"+props.permlink}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            Go To Post
          </a>
        </div>

        
      </div>
    </div>

    
  </div>
</>

  );
};

export default EventCard;


