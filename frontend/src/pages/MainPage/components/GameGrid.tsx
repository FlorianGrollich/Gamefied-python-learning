import React from 'react';
import BananaSVG from "assets/svg_component";
import {Canvas, useLoader} from "@react-three/fiber";
import {GradientTexture, Grid, OrbitControls, RoundedBox, useTexture} from "@react-three/drei";
import {GridHelper,} from "three";


interface GameGridProps {
    cubePositions: [number, number, number];
}

const GameGrid: React.FC<GameGridProps> = ({cubePositions}) => {


    return (
        <div className="bg-black h-[90vh]">

            <Canvas camera={{position: [0, 0, 500]}}>
                <ambientLight intensity={0.5}/>
                <directionalLight position={[0, 20, 0]}/>
                <mesh position={cubePositions}>
                    <boxGeometry args={[20, 20, 20]}/>
                </mesh>


                <mesh position={[0, -20, 0]}>
                    <boxGeometry args={[400, 10, 400]}/>
                    <meshBasicMaterial>
                        <GradientTexture
                            stops={[0, 1]}
                            colors={['#ff9c00', '#ffdd33']}
                        />
                    </meshBasicMaterial>
                </mesh>
                <OrbitControls/>
            </Canvas>
        </div>
    );
};

export default GameGrid;
