import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import Layout from "@/components/layout";
import { getMovies } from "../services/movieService";
import LoadingSpinner from "@/components/LoadingSpinner";
import MoviesGrid from '@/components/MoviesGrid';

const Movies = () => {
  const [isFetching, setIsFetching] = useState(true); // Start as fetching
  const [moviesData, setMoviesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 8; // Number of movies per page

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsFetching(true);
        const movies = await getMovies(currentPage, limit);
        setMoviesData(movies);
        setTotalPages(16);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsFetching(false); // Stop fetching after data is loaded or if there is an error
      }
    };

    fetchMovies();
  }, [currentPage]); // Re-fetch movies when the page changes

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Layout title="My Movies">
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <>
            <MoviesGrid movies={moviesData} />
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
                </button>
                {[...Array(totalPages).keys()].slice(Math.max(0, currentPage - 2), currentPage + 1).map((page) => (
                <button
                    key={page + 1}
                    onClick={() => handlePageChange(page + 1)}
                    className={page + 1 === currentPage ? "active" : ""}
                >
                    {page + 1}
                </button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
                </button>
            </div>
        </>
      )}
    </Layout>
  );
};

export default Movies;
