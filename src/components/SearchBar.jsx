import React from "react";
import { useEffect,useState } from "react";

export default function SearchBar({Location,setLocation})
{
    const [Loc,setLoc]=useState('');
    const handleChange = (event) => {
        setLoc(event.target.value);
    };

    return(
        <div className="flex items-center">
            <input
                type="text"
                value={Loc}
                onChange={handleChange}
                className="border border-gray-300 p-2 mr-2 rounded h-[5vh]"
                placeholder="Enter location"
            style={{width:'75vw'}}
            />
            <button
                onClick={()=>{setLocation(Loc)}}
                className="bg-blue-500 text-white p-2 rounded h-[5vh]"
            >
                <img src="src/assets/search.png" style={{height:'100%'}}/>
            </button>
        </div>
    )
}