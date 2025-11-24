import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import LandingPage from './pages/LandingPage';
import TournamentPage from './pages/TournamentPage';
import type { Movie } from './backend';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showTournament, setShowTournament] = useState(false);

  const handleTournamentGenerated = (filteredMovies: Movie[]) => {
    setMovies(filteredMovies);
    setShowTournament(true);
  };

  const handleBackToHome = () => {
    setShowTournament(false);
    setMovies([]);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background">
        {!showTournament ? (
          <LandingPage onTournamentGenerated={handleTournamentGenerated} />
        ) : (
          <TournamentPage movies={movies} onBackToHome={handleBackToHome} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
