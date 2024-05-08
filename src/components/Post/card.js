import React, { useEffect, useState } from "react"; 
import imag from './pic.png';

const EventCard = (props) => {
  const [userImages, setUserImages] = useState([]);
  const [body, setBody] = useState(props.body);
  let modifiedBody = props.body;
  const bodyContent = modifiedBody.match(/!\[.*?\]\((.*?)\)/g);

  useEffect(()=>{
    if (bodyContent) {
      
      const extractedImages = bodyContent.reduce((acc, content) => {
        // Extracting the URL from the markdown syntax
        const imageURLMatch = content.match(/\((.*?)\)/);
        if (imageURLMatch) {
          const imageURL = imageURLMatch[1];
          // Check if the URL ends with .jpg, .png, .webp, or .jpeg
          // if (imageURL.toLowerCase().endsWith('.jpg') ||
          //     imageURL.toLowerCase().endsWith('.png') ||
          //     imageURL.toLowerCase().endsWith('.webp') ||
          //     imageURL.toLowerCase().endsWith('.jpeg')) {
          //   
          // }
          acc.push(imageURL);
        }
        // Remove the text between []() from the body
        modifiedBody = modifiedBody.replace(content, '');
        setBody(modifiedBody);
        return acc;
      }, []);
  
      setUserImages(extractedImages);
    }
  
  },[props.body])

  return (
    <>
  {/* Main-box */}
  <div className="bg-[#0000004d] p-3 w-[90vw] min-h-40 flex flex-col my-[20px] mx-[5vw] text-[#f0f8ff] backdrop-blur rounded-[25px] shadow-[0px_0px_20px_#8f8f8f8f] items-center max-[768px]:flex-wrap max-[768px]:justify-center">
    {/* Render images */}
    {userImages.length>0 ? <div className="flex w-[60%] justify-center items-center mb-10">
      <img src={userImages[0]} alt={`Image`} className="border rounded-md" />
    </div> : <></>}
    {/* About */}
    <div className="w-3/5 lg:w-90 md:w-90 max-[768px]:w-[90%]">
      <div className="font-retrog text-center md:text-left lg:text-3xl md:text-3xl sm:text-3xl text-4xl mt-0 max-[640px]:my-2 max-[640px]:flex justify-center">
        {props.author}
      </div>

      <div className="font-ticketing xl:text-xl sm:text-md max-[640px]:text-md">
        {/* Render the rest of the body */}
        <div dangerouslySetInnerHTML={{ __html: body.slice(0, 600) }} />
      </div>
      <br />
      <div className="flex w-full justify-between md:justify-start items-center">
      <div className="w-fit text-2">
        <a
          className="font-bold text-xl underline text-yellow-400 pr-5"
          href={`https://hive.blog/${props.category}/@${props.author}/${props.permlink}`}
          target="_blank"
          rel="noopener noreferrer"
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


