import React from 'react';
import WelcomeImage from './../assets/background.png';
import CollaborateImage from './../assets/solve-puzzle.png';
import { User } from "./../types/types.d";
import { content } from "./../content";

interface WelcomeSectionProps {
  user: User | null;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ user }) => {
  return (
    <>
      <div
        className="h-screen flex flex-col justify-center items-center bg-cover text-center text-white relative"
        style={{ backgroundImage: `url(${WelcomeImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-filter backdrop-blur-sm"></div>
        <div className="relative z-5">
          {user ? (
            <>
              <h1 className="text-6xl text-[#181043] font-bold bg-[#FFAB76] mt-4 rounded-lg">Hello, {user.username}!</h1>
            </>
          ) : (
            <>
              <h1 className="text-6xl text-[#181043] font-bold bg-[#FFAB76] mt-4 rounded-lg">Welcome to Python Playground!</h1>
            </>
          )}
        </div>
      </div>

      <div className="h-screen flex flex-col md:flex-row justify-center items-center bg-gradient-to-b from-blue-200 to-white text-blue-900">
        <div className="md:w-1/2 p-8">
          <h2 className="text-4xl font-bold">{content.featureLeftTitle}</h2>
          <p className="mt-4 text-2xl">{content.featureLeftDescription}</p>
        </div>
        <div className="md:w-1/2 p-8 flex justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1591040092219-081fb773589c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Puzzle Graffito"
            className="max-w-xs rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="h-screen flex flex-col md:flex-row-reverse justify-center items-center bg-gradient-to-b from-white to-blue-200 text-blue-900">
        <div className="md:w-1/2 p-8">
          <h2 className="text-4xl font-bold">{content.featureRightTitle}</h2>
          <p className="mt-4 text-2xl">{content.featureRightDescription}</p>
        </div>
        <div className="md:w-1/2 p-8 flex justify-center items-center">
          <img
            src={CollaborateImage}
            alt="Two kids working together on a puzzle"
            className="max-w-xs rounded-lg shadow-lg"
          />
        </div>
      </div>
      
      <div className="h-screen flex flex-col md:flex-row justify-center items-center bg-gradient-to-b from-blue-200 to-white text-blue-900">
        <div className="md:w-1/2 p-8">
          <h2 className="text-4xl font-bold">{content.featureThirdTitle}</h2>
          <p className="mt-4 text-2xl">{content.featureThirdDescription}</p>
        </div>
        <div className="md:w-1/2 p-8 flex justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1582921017967-79d1cb6702ee?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Kid playing with small plastic toy trains on a map"
            className="max-w-xs rounded-lg shadow-lg"
          />
        </div>
      </div>
    </>
  );
};

export default WelcomeSection;
