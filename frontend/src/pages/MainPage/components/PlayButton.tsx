import React from 'react';

const PlayButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    className="h-20 w-20 bg-white text-black hover:text-white hover:bg-black"
    onClick={onClick}
  >
    Play
  </button>
);

export default PlayButton;
