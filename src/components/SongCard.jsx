import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from "../services/storage";
import { useState } from "react";

function SongCard({ song, onUnfavorite }) {
  const [favorited, setFavorited] = useState(isFavorite(song.id));

  const handleFavorite = () => {
    if (favorited) {
      removeFromFavorites(song.id);
      setFavorited(false);
      if (onUnfavorite) onUnfavorite(song.id); // Favoriler sayfasında listeden kaldır
    } else {
      addToFavorites(song);
      setFavorited(true);
    }
  };

  return (
    <div className="bg-[#181818] hover:bg-[#282828] rounded-xl overflow-hidden flex flex-col transition-all duration-300 group">
      {/* Kapak */}
      <div className="relative">
        <img
          src={song.image}
          alt={song.name}
          className="w-full h-48 object-cover"
        />
        <a
          href={song.spotifyUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-2 right-2 
                   bg-[#1DB954] rounded-full p-3
                   opacity-0 group-hover:opacity-100
                   translate-y-2 group-hover:translate-y-0
                   transition-all duration-300 shadow-xl">
          <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </a>
      </div>

      {/* Bilgi */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-bold text-white truncate">{song.name}</h3>
        <p className="text-gray-400 text-sm truncate">{song.artist}</p>
        <p className="text-gray-600 text-xs truncate">{song.album}</p>

        {/* Audio Preview */}
        {song.preview && (
          <audio
            controls
            className="w-full mt-3 h-8 opacity-60 hover:opacity-100 transition">
            <source src={song.preview} type="audio/mpeg" />
          </audio>
        )}

        {/* Favori Butonu */}
        <button
          onClick={handleFavorite}
          className={`mt-3 w-full py-2 rounded-full text-sm font-medium transition-all
            ${
              favorited
                ? "border border-[#1DB954] text-[#1DB954] hover:border-red-500 hover:text-red-500"
                : "border border-gray-600 text-gray-300 hover:border-white hover:text-white"
            }`}>
          {favorited ? "❤️ Favorilerden Çıkar" : "🤍 Favoriye Ekle"}
        </button>
      </div>
    </div>
  );
}

export default SongCard;
