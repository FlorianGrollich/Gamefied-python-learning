import React, {useEffect} from 'react';
import BananaSVG from "../assets/svg_component";

interface CellProps {
    char: string;
}

interface SvgMapping {
    [key: string]: React.ReactNode | undefined;
}

const Cell: React.FC<CellProps> = ({char}) => {
    const svgMapping: SvgMapping = {
        "P": <BananaSVG/>,
        "": <div className="p-4"/>
    }
    const SvgElement = svgMapping[char]

    return (
        <div className="border border-gray-500">
            {SvgElement}
        </div>

    );
};

export default Cell;
