import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Story from './components/Story/Story';
import EventDetails from './components/EventDetails/EventDetails';
import Gallery from './components/Gallery/Gallery';
import MusicSection from './components/MusicSection/MusicSection';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Footer from './components/Footer/Footer';
import Scene from './three/Scene';
import SplitTransition from './components/SplitTransition/SplitTransition';

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-screen bg-ink overflow-hidden">
      {/* Initial Splash Screen Split Overlay */}
      <SplitTransition />

      {/* Fixed 3D backdrop */}
      <Scene className="fixed inset-0 z-0 opacity-60 sm:opacity-75 pointer-events-none" />

      <div className="relative z-10">
        <Navbar visible={opened} />
        <Hero opened={opened} onOpen={() => setOpened(true)} />

        {opened && (
          <>
            <Story />
            <EventDetails />
            <MusicSection />
            <Gallery />
            <Footer />
          </>
        )}
      </div>

      <MusicPlayer visible={opened} />
    </div>
  );
}