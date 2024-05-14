import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function Protection(){
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        if(!localStorage.getItem("token")){
            window.location.href = "/";
        }
        else{
            setLoader(false);
        }
    }, []);

    return(
        loader? "Spinner...." : <Outlet />
    )
}