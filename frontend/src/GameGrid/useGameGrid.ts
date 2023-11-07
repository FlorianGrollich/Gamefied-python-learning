import {useState} from "react";


export const useGameGrid = () => {
    const [gameGrid] = useState<string[][]>();
    const fetchInitialGameGrid = async ()=> {
        
    }


    return {
        gameGrid
    }
}