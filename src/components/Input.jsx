import { useState, useEffect } from "react";

const EXAMPLES = [
  "Sabah koşusunda dinlenecek müzikler",
  "Yürüyüş yaparken enerjik şarkılar",
  "Çalışırken odaklanma müzikleri",
  "Üzgün hissediyorum, melankolik şarkılar",
  "Spor salonunda motivasyon müzikleri",
  "Yağmurlu bir günde dinlecek şarkılar",
  "Arkadaşlarla parti müzikleri",
  "Gece araç kullanırken şarkılar",
];

function PromptInput({ onSearch, loading }) {
  const [mood, setMood] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    const random = EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)];
    setPlaceholder(random);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood.trim()) {
      onSearch(mood);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          className="w-full px-6 py-4 text-lg rounded-full 
         bg-[#2A2A2A] text-white placeholder-gray-500
         border-2 border-transparent
         focus:border-[#1DB954] focus:outline-none
         disabled:opacity-50 disabled:cursor-not-allowed
         transition-all pr-28"
        />
        <button
          type="submit"
          disabled={loading || !mood.trim()}
          className="absolute right-2 
                   bg-[#1DB954] hover:bg-[#1ed760] 
                   text-black font-bold
                   px-6 py-2 rounded-full
                   disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed
                   transition-all">
          {loading ? "Arıyor..." : "Keşfet"}
        </button>
      </div>
    </form>
  );
}

export default PromptInput;
