import React, { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    startTransition(() => {
      navigate("/game");
    });
  };

  return (
    <div className={"grid grid-cols-9 grid-rows-9 gap-4 min-h-screen"}>
      <div className={"col-start-1"}></div>
      <div onClick={handleNavigation} className={"bg-white col-start-2 col-end-6 row-start-2 row-end-9"}>
        Create New Game
      </div>
      <div className={"col-start-6 col-end-9 row-start-2 row-end-5 bg-red-600"}></div>
      <div className={"col-start-6 "}></div>
    </div>
  );
}

export default MenuPage;