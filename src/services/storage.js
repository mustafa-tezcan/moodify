// Favorileri al (READ)
export const getFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

// Favoriye ekle (CREATE)
export const addToFavorites = (song) => {
  const favorites = getFavorites();

  // Zaten var mı kontrol et
  const exists = favorites.find((f) => f.id === song.id);
  if (exists) {
    return false; // Zaten ekli
  }

  const newFavorite = {
    ...song,
    addedAt: new Date().toISOString(),
    note: "",
    rating: 0,
  };

  favorites.push(newFavorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  return true;
};

// Favoriden çıkar (DELETE)
export const removeFromFavorites = (songId) => {
  const favorites = getFavorites();
  const updated = favorites.filter((f) => f.id !== songId);
  localStorage.setItem("favorites", JSON.stringify(updated));
};

// Favori güncelle - not/rating ekle (UPDATE)
export const updateFavorite = (songId, updates) => {
  const favorites = getFavorites();
  const updated = favorites.map((f) =>
    f.id === songId ? { ...f, ...updates } : f,
  );
  localStorage.setItem("favorites", JSON.stringify(updated));
};

// Favoride mi kontrol et
export const isFavorite = (songId) => {
  const favorites = getFavorites();
  return favorites.some((f) => f.id === songId);
};
