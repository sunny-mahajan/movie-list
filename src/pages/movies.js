import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import Layout from "@/components/layout";
import { getMovies } from "../services/movieService";
import LoadingSpinner from "@/components/LoadingSpinner";
import MoviesGrid from "@/components/MoviesGrid";

const Movies = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageDocs, setPageDocs] = useState([]); // To store documents for each page

  const fetchMovies = async (page) => {
    try {
      setIsFetching(true);
      const limitValue = 8;
      const {
        movies,
        totalMovies,
        lastVisibleDoc: newLastVisibleDoc,
        firstVisibleDoc: newFirstVisibleDoc,
      } = await getMovies(
        page,
        limitValue,
        page === 1 ? null : pageDocs[page - 2]?.lastVisibleDoc
      );
      setMoviesData(movies);
      setTotalPages(Math.ceil(totalMovies / limitValue)); // Calculate total pages
      setPageDocs((prev) => [
        ...prev,
        {
          page,
          lastVisibleDoc: newLastVisibleDoc,
          firstVisibleDoc: newFirstVisibleDoc,
        },
      ]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageBtnCommonClasses = "w-7 h-7 rounded ";

  return (
    <Layout title="My Movies">
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <>
          <MoviesGrid movies={moviesData} />
          <div className="pagination flex gap-4 justify-center font-montserrat font-bold">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages).keys()]
              .slice(Math.max(0, currentPage - 2), currentPage + 1)
              .map((page) => (
                <button
                  key={page + 1}
                  onClick={() => handlePageChange(page + 1)}
                  className={page + 1 === currentPage ? pageBtnCommonClasses + "bg-[#2BD17E]" : pageBtnCommonClasses + "bg-[#092C39]"}
                >
                  {page + 1}
                </button>
              ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Movies;
