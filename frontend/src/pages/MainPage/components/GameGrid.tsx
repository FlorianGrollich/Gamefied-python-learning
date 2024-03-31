import React from 'react';
import BananaSVG from "assets/svg_component";
import {Canvas, useLoader} from "@react-three/fiber";
import {GradientTexture, OrbitControls, RoundedBox, useTexture} from "@react-three/drei";
import {TextureLoader} from "three";
import groundTexture from "../../../assets/angryimg.jpg";

const GameGrid: React.FC = () => {

    const colorMap = useLoader(TextureLoader, groundTexture)
    return (
        <div className="bg-red-400 h-screen">
            <Canvas camera={{position: [0,0,30]}}>
                <ambientLight intensity={0.5}/>
                <directionalLight position={[0, 5, 0]}/>
                <mesh>
                    <boxGeometry args={[20, 0.5, 20]}/>
                    <meshBasicMaterial>
                        <GradientTexture
                            stops={[0, 1]} // As many stops as you want
                            colors={['#ff9c00', '#ffdd33']} // Colors need to match the number of stops
                        />
                    </meshBasicMaterial>
                </mesh>
                <OrbitControls/>
            </Canvas>
        </div>
    );
};

export default GameGrid;
