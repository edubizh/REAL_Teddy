import { useState } from 'react';
import { Film, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllGenres, useGetAllEras, useGetAllVibes, useGetFilteredMovies } from '../hooks/useQueries';
import type { Movie, FilterCriteria } from '../backend';

interface LandingPageProps {
  onTournamentGenerated: (movies: Movie[]) => void;
}

export default function LandingPage({ onTournamentGenerated }: LandingPageProps) {
  const [genre, setGenre] = useState<string>('');
  const [era, setEra] = useState<string>('');
  const [vibe, setVibe] = useState<string>('');
  const [criteria, setCriteria] = useState<FilterCriteria | null>(null);

  const { data: genres = [], isLoading: genresLoading } = useGetAllGenres();
  const { data: eras = [], isLoading: erasLoading } = useGetAllEras();
  const { data: vibes = [], isLoading: vibesLoading } = useGetAllVibes();
  const { data: movies = [], isLoading: moviesLoading } = useGetFilteredMovies(criteria);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (genre && era && vibe) {
      setCriteria({ genre, era, vibe });
    }
  };

  // When movies are loaded, pass them to parent
  if (movies.length > 0 && !moviesLoading && criteria) {
    onTournamentGenerated(movies);
  }

  const isFormValid = genre && era && vibe;
  const isLoading = genresLoading || erasLoading || vibesLoading || moviesLoading;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/film-strip-pattern.dim_800x600.png"
          alt=""
          className="h-full w-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/40 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between px-4 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Film className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Teddy</h1>
                <p className="text-xs text-muted-foreground">Movie Tournament</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-4xl">
            {/* Hero Section */}
            <div className="mb-12 text-center">
              <div className="mb-6 flex justify-center">
                <img
                  src="/assets/generated/popcorn-cinema.dim_400x300.png"
                  alt="Cinema"
                  className="h-48 w-auto rounded-lg shadow-2xl"
                />
              </div>
              <h2 className="mb-4 text-5xl font-bold tracking-tight">
                Find Your Perfect Movie
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Let the tournament begin! Select your preferences and we'll generate a bracket of 16 movies
                tailored to your taste. May the best film win.
              </p>
            </div>

            {/* Form Card */}
            <Card className="border-border/50 bg-card/50 shadow-2xl backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <Sparkles className="h-6 w-6 text-accent" />
                  Create Your Tournament
                </CardTitle>
                <CardDescription>
                  Choose your preferences to generate a personalized movie bracket
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    {/* Genre Select */}
                    <div className="space-y-2">
                      <Label htmlFor="genre" className="text-base font-medium">
                        Genre
                      </Label>
                      <Select value={genre} onValueChange={setGenre} disabled={isLoading}>
                        <SelectTrigger id="genre" className="h-12 bg-background/50">
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent>
                          {genres.map((g) => (
                            <SelectItem key={g} value={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Era Select */}
                    <div className="space-y-2">
                      <Label htmlFor="era" className="text-base font-medium">
                        Era
                      </Label>
                      <Select value={era} onValueChange={setEra} disabled={isLoading}>
                        <SelectTrigger id="era" className="h-12 bg-background/50">
                          <SelectValue placeholder="Select era" />
                        </SelectTrigger>
                        <SelectContent>
                          {eras.map((e) => (
                            <SelectItem key={e} value={e}>
                              {e}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Vibe Select */}
                    <div className="space-y-2">
                      <Label htmlFor="vibe" className="text-base font-medium">
                        Vibe
                      </Label>
                      <Select value={vibe} onValueChange={setVibe} disabled={isLoading}>
                        <SelectTrigger id="vibe" className="h-12 bg-background/50">
                          <SelectValue placeholder="Select vibe" />
                        </SelectTrigger>
                        <SelectContent>
                          {vibes.map((v) => (
                            <SelectItem key={v} value={v}>
                              {v}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="h-14 w-full text-lg font-semibold"
                    disabled={!isFormValid || isLoading}
                  >
                    {moviesLoading ? (
                      <>
                        <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        Generating Tournament...
                      </>
                    ) : (
                      <>
                        <Film className="mr-2 h-5 w-5" />
                        Generate Tournament Bracket
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
                    <Film className="h-7 w-7 text-accent" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold">16 Movies</h3>
                <p className="text-sm text-muted-foreground">
                  Curated selection based on your preferences
                </p>
              </div>
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
                    <Sparkles className="h-7 w-7 text-accent" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold">Smart Filtering</h3>
                <p className="text-sm text-muted-foreground">
                  Matches genre, era, and vibe to your taste
                </p>
              </div>
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <img
                    src="/assets/generated/tournament-trophy.dim_300x300.png"
                    alt="Trophy"
                    className="h-14 w-14 rounded-full object-cover"
                  />
                </div>
                <h3 className="mb-2 font-semibold">Tournament Style</h3>
                <p className="text-sm text-muted-foreground">
                  Classic bracket format for easy comparison
                </p>
              </div>
            </div>
          </div>
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
    </div>
  );
}
