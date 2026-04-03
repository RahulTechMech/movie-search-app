const MovieCard = ({ movie, toggleFavorite, favorites }) => {
  const isFav = favorites?.some((m) => m.id === movie.id);

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
      {/* 🔴 IMPORTANT: relative container */}
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />

        {/* ❤️ Favorite Button (top) */}
        <button
          onClick={() => toggleFavorite(movie)}
          className="absolute top-2 right-2 text-xl z-10 bg-black bg-opacity-50 rounded-full p-1"
        >
          {isFav ? "❤️" : "🤍"}
        </button>

        {/* 🔥 HOVER OVERLAY */}
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition duration-300 flex items-center justify-center text-center p-2">
          <p className="text-xs text-white">
            {movie.overview || "No description available"}
          </p>
        </div>
      </div>

      {/* Bottom content */}
      <div className="p-3">
        <h2 className="font-semibold text-sm">{movie.title}</h2>
        <p className="text-yellow-400 text-sm">⭐ {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCard;
