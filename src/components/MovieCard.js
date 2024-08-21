import React from 'react';
import { useRouter } from "next/router";

function MovieCard({ movie }) {
  const router = useRouter();
  const handleUpdateMovieClick = () => {
    router.push(`/update-movie/${movie.id}`);
  }
  return (
    <div onClick={handleUpdateMovieClick} className="bg-[#092C39] font-montserrat rounded-2xl w-64 overflow-hidden cursor-pointer" data-movie-id={movie.id}>
      <img src={movie.poster} alt={movie.title} className="w-full h-80 object-cover rounded-3xl p-2" />
      <div className="px-3 pb-4">
        <h3 className="text-lg font-medium pb-1">{movie.title}</h3>
        <p className="font-normal text-gray-400">{movie.publishingYear}</p>
      </div>
    </div>
  );
}

export default MovieCard;