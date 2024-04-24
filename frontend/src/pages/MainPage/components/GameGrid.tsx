import React, {useRef} from 'react';
import BananaSVG from "assets/svg_component";
import {Canvas, useLoader} from "@react-three/fiber";
import {GradientTexture, Grid, OrbitControls, RoundedBox, useFBX, useTexture} from "@react-three/drei";
import {GridHelper,} from "three";
import { useGLTF} from "@react-three/drei";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


interface GameGridProps {
    cubePositions: [number, number, number];
}
const GameGrid: React.FC<GameGridProps> = ({cubePositions}) => {
    const groupRef = useRef()
    const gltf = useGLTF("/mars-rover-4.glb",);


    return (
        <div className="bg-black h-[90vh]">

            <Canvas camera={{position: [0, 0, 500]}}>
                <ambientLight intensity={0.5}/>
                <directionalLight position={[0, 50, 0]}/>
                <primitive object={gltf.scene} scale={10} rotation={[0,4.75,0]} position={cubePositions} />


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
