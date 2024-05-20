import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  GradientTexture,
  Grid,
  OrbitControls,
  RoundedBox,
  useFBX,
  useTexture,
} from '@react-three/drei';
import { useGLTF } from '@react-three/drei';

interface GameGridProps {
  cubePositions: [number, number, number];
}
const GameGrid: React.FC<GameGridProps> = ({ cubePositions }) => {
  const groupRef = useRef();
  const gltf = useGLTF('/asset/mars-rover-4.glb');

  return (
    <div className="bg-black h-[90vh]">
      <Canvas camera={{ position: [0, 0, 500] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 50, 0]} />
        <primitive
          object={gltf.scene}
          scale={10}
          rotation={[0, 4.75, 0]}
          position={cubePositions}
        />

        <mesh position={[0, -5, 0]}>
          <boxGeometry args={[400, 10, 400]} />
          <meshBasicMaterial>
            <GradientTexture stops={[0, 1]} colors={['#ff9c00', '#ffdd33']} />
          </meshBasicMaterial>
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default GameGrid;
