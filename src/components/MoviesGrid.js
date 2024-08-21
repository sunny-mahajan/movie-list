import React from 'react';
import MovieCard from './MovieCard';
function MovieGrid({ movies }) {
  return (
    <div className="bg-dark-blue">
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieGrid;