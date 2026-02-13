// GPT'den şarkı önerileri al
export const getRecommendations = async (mood) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Sen bir müzik öneri asistanısın.
          Kullanıcı sana HERHANGİ bir şey yazabilir: bir duygu, aktivite, kelime, cümle veya saçma bir şey.
          Ne yazarsa yazsın, SEN ona uygun 5-10 şarkı önermelisin (bu sayı yaklasık verilmistir).
          Şarkıları özgün olarak seç, her seferinde en popüler olanları değil.
          Anlamsız görünse bile en yakın müzik kategorisini tahmin et ve öner.
          Cevabını mutlaka JSON formatında ver.
          JSON içinde sadece 'songs' adlı bir dizi olsun.
          Her eleman şu şekilde olmalı:
          {
            "artist": "Sanatçı adı",
            "track": "Şarkı adı"
          }
          SADECE JSON döndür, hiçbir açıklama veya markdown kod bloğu kullanma.
          Direkt olarak { ile başla.`,
        },
        {
          role: "user",
          content: mood,
        },
      ],
      temperature: 0.5,
    }),
  });

  if (!response.ok) {
    throw new Error("GPT API isteği başarısız oldu");
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  // Markdown temizle (``` varsa)
  const cleaned = content.replace(/```(?:json)?\s*|\s*```/g, "").trim();

  // JSON parse et
  const parsed = JSON.parse(cleaned);
  return parsed.songs; // [{artist, track}, ...]
};

// Spotify'da şarkı ara
const getSpotifyToken = async () => {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const auth = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
};

const searchiTunes = async (artist, track) => {
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(`${artist} ${track}`)}&limit=1&entity=song`,
    );
    const data = await response.json();

    if (data.results.length === 0) return null;

    return {
      preview: data.results[0].previewUrl,
    };
  } catch (err) {
    console.error("iTunes error:", err);
    return null;
  }
};

export const getTrackDetails = async (songs) => {
  const token = await getSpotifyToken();
  const results = [];

  for (const song of songs) {
    // 1. Spotify'dan şarkı bilgisi al
    const query = `${song.track} artist:${song.artist}`;
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) continue;

    const data = await response.json();
    const items = data.tracks.items;
    if (items.length === 0) continue;

    const track = items[0];

    const itunesData = await searchiTunes(song.artist, song.track);

    results.push({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      image: track.album.images[0]?.url || "",
      spotifyUrl: track.external_urls.spotify,
      preview: itunesData?.preview || null,
    });
  }

  return results;
};
