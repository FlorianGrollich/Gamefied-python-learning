import React from 'react';

interface CellProps {
    char: string;
}

const Cell: React.FC<CellProps> = ({char}) => {
    return (
        <div className="cell">
        </div>
    );
};

export default Cell;
