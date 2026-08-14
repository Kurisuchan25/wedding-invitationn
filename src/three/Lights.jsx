export default function Lights() {
  return (
    <>
      {/* Ambient — periwinkle blue fill */}
      <ambientLight intensity={0} color="#EAF6FD" />

      {/* Key light — lavender blue from upper-right */}
      <directionalLight
        position={[4, 5, 3]}
        intensity={0}
        color="#99c1d8ff"
      />

      {/* Rim light — rich periwinkle from behind */}
      <pointLight position={[-6, -2, -4]} intensity={6} color="#EAF6FD" distance={25} decay={2} />

      {/* Fill — powder blue from below */}
      <pointLight position={[0, -3, 4]} intensity={4} color="#C8E9F6" distance={20} decay={2} />

      {/* Accent — soft violet-blue from top */}
      <pointLight position={[3, 8, 2]} intensity={3} color="#EAF6FD" distance={20} decay={2} />
    </>
  );
}
