import { useState } from 'react';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BracketRound from '../components/BracketRound';
import type { Movie } from '../backend';

interface TournamentPageProps {
  movies: Movie[];
  onBackToHome: () => void;
}

type Round = 'round-of-16' | 'quarterfinals' | 'semifinals' | 'finals';

export default function TournamentPage({ movies, onBackToHome }: TournamentPageProps) {
  const [currentRound, setCurrentRound] = useState<Round>('round-of-16');

  // Ensure we have exactly 16 movies, pad with placeholders if needed
  const paddedMovies = [...movies];
  while (paddedMovies.length < 16) {
    paddedMovies.push({
      title: 'TBD',
      genre: '',
      era: '',
      vibe: '',
    });
  }

  // Split movies into rounds
  const roundOf16 = paddedMovies.slice(0, 16);
  const quarterfinals = paddedMovies.slice(0, 8);
  const semifinals = paddedMovies.slice(0, 4);
  const finals = paddedMovies.slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToHome}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" />
              <h1 className="text-xl font-bold">Movie Tournament</h1>
            </div>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={currentRound} onValueChange={(v) => setCurrentRound(v as Round)} className="w-full">
          <div className="mb-8 flex justify-center">
            <TabsList className="grid w-full max-w-2xl grid-cols-4 bg-muted/50">
              <TabsTrigger value="round-of-16" className="text-xs sm:text-sm">
                Round of 16
              </TabsTrigger>
              <TabsTrigger value="quarterfinals" className="text-xs sm:text-sm">
                Quarterfinals
              </TabsTrigger>
              <TabsTrigger value="semifinals" className="text-xs sm:text-sm">
                Semifinals
              </TabsTrigger>
              <TabsTrigger value="finals" className="text-xs sm:text-sm">
                Finals
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="round-of-16" className="mt-0">
            <BracketRound movies={roundOf16} roundName="Round of 16" matchupsPerColumn={4} />
          </TabsContent>

          <TabsContent value="quarterfinals" className="mt-0">
            <BracketRound movies={quarterfinals} roundName="Quarterfinals" matchupsPerColumn={2} />
          </TabsContent>

          <TabsContent value="semifinals" className="mt-0">
            <BracketRound movies={semifinals} roundName="Semifinals" matchupsPerColumn={1} />
          </TabsContent>

          <TabsContent value="finals" className="mt-0">
            <BracketRound movies={finals} roundName="Finals" matchupsPerColumn={1} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025. Built with love using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:text-accent transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
