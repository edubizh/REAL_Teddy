import { Card } from '@/components/ui/card';
import type { Movie } from '../backend';

interface BracketRoundProps {
  movies: Movie[];
  roundName: string;
  matchupsPerColumn: number;
}

export default function BracketRound({ movies, roundName, matchupsPerColumn }: BracketRoundProps) {
  // Create matchups (pairs of movies)
  const matchups: [Movie, Movie][] = [];
  for (let i = 0; i < movies.length; i += 2) {
    if (i + 1 < movies.length) {
      matchups.push([movies[i], movies[i + 1]]);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">{roundName}</h2>
        <p className="mt-2 text-muted-foreground">
          {matchups.length} {matchups.length === 1 ? 'Matchup' : 'Matchups'}
        </p>
      </div>

      <div className="mx-auto max-w-6xl">
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: `repeat(${Math.ceil(matchups.length / matchupsPerColumn)}, 1fr)`,
          }}
        >
          {matchups.map((matchup, index) => (
            <div key={index} className="space-y-4">
              <div className="text-center">
                <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-sm font-medium text-accent">
                  Match {index + 1}
                </span>
              </div>
              <div className="relative space-y-3">
                {/* Movie 1 */}
                <Card className="group relative overflow-hidden border-border/50 bg-card/50 p-4 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold leading-tight group-hover:text-accent transition-colors">
                        {matchup[0].title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {matchup[0].genre}
                        </span>
                        <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {matchup[0].era}
                        </span>
                        <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {matchup[0].vibe}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                      1
                    </div>
                  </div>
                </Card>

                {/* VS Connector */}
                <div className="flex items-center justify-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                    VS
                  </div>
                </div>

                {/* Movie 2 */}
                <Card className="group relative overflow-hidden border-border/50 bg-card/50 p-4 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold leading-tight group-hover:text-accent transition-colors">
                        {matchup[1].title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {matchup[1].genre}
                        </span>
                        <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {matchup[1].era}
                        </span>
                        <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {matchup[1].vibe}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                      2
                    </div>
                  </div>
                </Card>

                {/* Bracket Connector Line */}
                {matchupsPerColumn > 1 && (
                  <div className="absolute -right-8 top-1/2 h-px w-8 -translate-y-1/2 bg-border/50" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
