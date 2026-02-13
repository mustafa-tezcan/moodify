import { getFavorites, removeFromFavorites } from "../services/storage";
import { useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState(getFavorites());

  const handleRemove = (songId) => {
    removeFromFavorites(songId);
    setFavorites(getFavorites());
  };
  const [listName, setListName] = useState(
    localStorage.getItem("favoritesName") || "Favorilerim",
  );
  const [editing, setEditing] = useState(false);

  const handleNameSave = () => {
    localStorage.setItem("favoritesName", listName);
    setEditing(false);
  };

  return (
    <div className="px-8 py-8">
      {/* Başlık + İsim Güncelle */}
      <div className="flex items-center gap-4 mb-6">
        {editing ? (
          <>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="bg-[#2A2A2A] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#1DB954] border border-gray-600"
            />
            <button
              onClick={handleNameSave}
              className="bg-[#1DB954] text-black font-bold px-4 py-2 rounded-full text-sm">
              Kaydet
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white">
              {listName} ({favorites.length})
            </h2>
            <button
              onClick={() => setEditing(true)}
              className="border border-gray-600 text-gray-400 hover:text-white hover:border-white px-3 py-1 rounded-full text-xs transition">
              ✏️ Düzenle
            </button>
          </>
        )}
      </div>

      {favorites.length === 0 ? (
        <p className="text-gray-400">Henüz favori eklemediniz.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {favorites.map((song) => (
            <div
              key={song.id}
              className="bg-[#181818] hover:bg-[#282828] rounded-xl overflow-hidden flex flex-col transition-all duration-300 group">
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

                {/* Audio */}
                {song.preview && (
                  <audio
                    controls
                    className="w-full mt-3 h-8 opacity-60 hover:opacity-100 transition">
                    <source src={song.preview} type="audio/mpeg" />
                  </audio>
                )}

                {/* Sil Butonu */}
                <button
                  onClick={() => handleRemove(song.id)}
                  className="mt-3 w-full py-2 rounded-full text-sm font-medium 
                           border border-gray-600 text-gray-300 
                           hover:border-red-500 hover:text-red-500 transition-all">
                  🗑️ Favorilerden Çıkar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
