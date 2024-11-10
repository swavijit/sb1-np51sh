import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TutorList from './components/TutorList';
import SearchBar from './components/SearchBar';
import AuthModal from './components/auth/AuthModal';
import { useStore } from './lib/store';
import { SearchFilters } from './types';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { searchTutors } = useStore();
  const [tutors, setTutors] = useState(searchTutors({}));

  const handleSearch = (filters: SearchFilters) => {
    setTutors(searchTutors(filters));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onAuthClick={() => setIsAuthOpen(true)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      
      <div className="pt-16">
        <Hero />
        <SearchBar onSearch={handleSearch} />
        <TutorList tutors={tutors} />
        <Features />
      </div>
    </div>
  );
}

export default App;