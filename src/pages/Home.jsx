import { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortOption, setSortOption] = useState("");

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) {
        return prev.filter((m) => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const getMovies = async () => {
        setLoading(true);
        setError("");

        try {
          const data = await fetchMovies(query);
          setMovies(data);
        } catch (err) {
          setError("Failed to fetch movies");
        } finally {
          setLoading(false);
        }
      };

      getMovies();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const sortedMovies = [...movies]
    .filter((movie) => movie.vote_average >= ratingFilter)
    .sort((a, b) => {
      if (sortOption === "ratingHigh") {
        return b.vote_average - a.vote_average;
      }
      if (sortOption === "ratingLow") {
        return a.vote_average - b.vote_average;
      }
      if (sortOption === "yearNew") {
        return (
          new Date(b.release_date || "1900-01-01") -
          new Date(a.release_date || "1900-01-01")
        );
      }
      if (sortOption === "yearOld") {
        return (
          new Date(a.release_date || "1900-01-01") -
          new Date(b.release_date || "1900-01-01")
        );
      }
      return 0;
    });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-500">
        🎬 Movie Search App
      </h1>

      {favorites.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-red-400">
            ❤️ Favorite Movies
          </h2>

          <div className="flex gap-3 overflow-x-auto">
            {favorites.map((movie) => (
              <div key={movie.id} className="min-w-[120px]">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <SearchBar setQuery={setQuery} />

      {/* Loading */}
      {loading && <Loader />}

      {/* Error */}
      {error && <Error message={error} />}

      {/* Empty State */}
      {!loading && !error && movies.length === 0 && (
        <p className="text-center mt-6 text-gray-400">No movies found 😔</p>
      )}

      <div className="flex justify-center gap-4 mb-4 flex-wrap">
        {/* Rating Filter */}
        <select
          className="p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setRatingFilter(Number(e.target.value))}
        >
          <option value="0">All Ratings</option>
          <option value="5">Above 5 ⭐</option>
          <option value="7">Above 7 ⭐</option>
          <option value="8">Above 8 ⭐</option>
        </select>

        {/* Sort Option */}
        <select
          className="p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="ratingHigh">Rating: High to Low</option>
          <option value="ratingLow">Rating: Low to High</option>
          <option value="yearNew">Newest First</option>
          <option value="yearOld">Oldest First</option>
        </select>
      </div>

      {/* Movie Grid */}
      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {sortedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
