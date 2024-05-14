import { useEffect } from "react"

export default function Protection(){
    useEffect(() => {
        if(!localStorage.getItem("token")){
            window.location.href = "/";
        }
    }, []);

    return(
       <></>
    )
}