# Teddy - Movie Tournament Decision App
test

## Overview
Teddy is a decision-making tournament application that helps friends select movies through a bracket-style tournament format. The app features a dark, cinematic theme similar to Netflix or IMDb.

## Core Features

### Landing Page Form
- Genre selection dropdown (Horror, Comedy, Action, Drama, Romance, Thriller, Sci-Fi)
- Era selection dropdown (70s, 80s, 90s, 2000s, 2010s, 2020s)
- Vibe selection dropdown (Scary, Feel-good, Intense, Romantic, Funny, Mind-bending)
- Submit button to generate tournament bracket

### Movie Data Management
The backend stores a curated list of popular movies with the following attributes:
- Movie title
- Genre classification
- Era/decade
- Vibe categorization

The backend provides filtering functionality to return 16 movies based on the user's form selections, using logical matching between user preferences and movie attributes.

### Tournament Bracket Display
- Static 16-slot tournament bracket layout representing "Round of 16"
- Clear display of all 16 movie titles in their bracket positions
- Visual bracket-style connectors between matchups
- Round navigation (Round of 16, Quarterfinals, Semifinals, Finals)
- Tournament state management using React state

### Design Requirements
- Dark, cinematic theme with Netflix/IMDb-inspired styling
- Clean typography suitable for movie titles
- Responsive layout using Tailwind CSS
- Visual clarity for bracket structure and movie matchups

### Technical Implementation
- Frontend manages all tournament state and navigation
- Backend serves filtered movie data based on form criteria
- No user authentication required
- No persistent storage of tournament results
- Static bracket generation (no interactive voting in MVP)

## User Flow
1. User visits landing page and fills out preference form
2. User submits form to generate tournament bracket
3. Backend returns 16 filtered movies based on preferences
4. Frontend displays movies in tournament bracket format
5. User can navigate between tournament rounds to view bracket structure
