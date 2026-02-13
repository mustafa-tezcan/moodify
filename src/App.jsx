import { useState } from "react";
import PromptInput from "./components/Input";
import { getRecommendations, getTrackDetails } from "./services/api";
import SongCard from "./components/SongCard";
import Favorites from "./pages/Favorites";

function App() {
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState("home"); // "home" veya "favorites"

  const handleSearch = async (mood) => {
    try {
      setLoading(true);
      setError(null);
      setSongs([]);

      console.log("1. Arama başladı:", mood);
      const recommendations = await getRecommendations(mood);
      console.log("2. GPT önerileri:", recommendations);

      const trackDetails = await getTrackDetails(recommendations);
      console.log("3. Spotify detayları:", trackDetails);

      setSongs(trackDetails);
    } catch (err) {
      console.error("HATA:", err);
      setError("Bir hata oluştu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Navbar */}
      <nav className="bg-black px-8 py-4 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setPage("home")}>
          <span className="text-[#1DB954] text-2xl">●</span>
          <span className="font-bold text-xl">Moodify</span>
        </div>

        {/* Favoriler Butonu */}
        <button
          onClick={() => setPage(page === "favorites" ? "home" : "favorites")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all
            ${
              page === "favorites"
                ? "bg-white text-black"
                : "border border-gray-600 text-gray-300 hover:border-white hover:text-white"
            }`}>
          ❤️ Favorilerim
        </button>
      </nav>

      {/* Sayfalar */}
      {page === "home" ? (
        <>
          {/* Hero */}
          <div className="flex flex-col items-center justify-center px-4 pt-20 pb-12">
            <h1 className="text-6xl font-bold text-center mb-4">
              Mood'una göre <span className="text-[#1DB954]">müzik</span> keşfet
            </h1>
            <p className="text-gray-400 text-lg mb-12 text-center">
              Nasıl hissettğini yaz, yapay zeka sana özel çalma listesi
              oluştursun
            </p>
            <PromptInput onSearch={handleSearch} loading={loading} />
          </div>

          {error && <p className="text-red-400 text-center mt-4">{error}</p>}

          {loading && (
            <div className="flex flex-col items-center justify-center mt-12 gap-4">
              <div className="w-12 h-12 border-4 border-[#1DB954] border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400">Şarkılar aranıyor...</p>
            </div>
          )}

          {songs.length > 0 && (
            <div className="px-8 pb-16">
              <h2 className="text-2xl font-bold mb-6 text-gray-200">
                🎵 Senin için {songs.length} şarkı bulundu
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {songs.map((song) => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <Favorites />
      )}
    </div>
  );
}

export default App;
