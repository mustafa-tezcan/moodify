# 🎵 Moodify — AI Müzik Öneri Uygulaması

> Mood'una göre şarkı keşfet. Yapay zeka destekli, Spotify entegrasyonlu müzik öneri uygulaması.

![Moodify](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat&logo=tailwind-css)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=flat&logo=openai)
![Spotify](https://img.shields.io/badge/Spotify-API-1DB954?style=flat&logo=spotify)
![Netlify](https://img.shields.io/badge/Netlify-Deploy-00C7B7?style=flat&logo=netlify)

---

## 🚀 Demo

🔗 [moodify.netlify.app](https://moodify.netlify.app)

---

## 📸 Ekran Görüntüsü

> _(Buraya proje ekran görüntüsü ekle)_

---

## 💡 Proje Hakkında

Moodify, kullanıcının ruh haline veya aktivitesine göre yapay zeka destekli şarkı önerileri sunan bir web uygulamasıdır.

Kullanıcı nasıl hissettğini yazar, GPT-4o-mini bu bilgiye göre şarkı önerileri üretir, ardından Spotify API'si ile şarkıların detayları ve iTunes API'si ile 30 saniyelik önizlemeler getirilir.

---

## ✨ Özellikler

- 🤖 **AI Destekli Öneri** — GPT-4o-mini ile mood'a özel şarkı önerileri
- 🎧 **30 Saniye Önizleme** — iTunes API ile şarkıları dinle
- 🎵 **Spotify Entegrasyonu** — Şarkıları Spotify'da aç
- ❤️ **Favori Listesi** — Beğendiğin şarkıları kaydet
- ✏️ **Liste Adı Güncelle** — Favori listenin adını düzenle
- 🗑️ **Favoriden Çıkar** — İstemediğin şarkıları kaldır
- 💾 **LocalStorage** — Favoriler kalıcı olarak saklanır
- 🎨 **Spotify Teması** — Koyu, modern Spotify benzeri arayüz
- 📱 **Responsive** — Mobil ve masaüstü uyumlu

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| **React 19** | UI kütüphanesi |
| **Tailwind CSS 3** | Stil kütüphanesi |
| **Vite** | Build tool |
| **OpenAI API** | GPT-4o-mini ile şarkı önerileri |
| **Spotify Web API** | Şarkı detayları ve kapak resimleri |
| **iTunes API** | 30 saniyelik önizleme URL'leri |
| **LocalStorage** | Favori şarkıları saklama |
| **Netlify** | Deploy |

---

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── Input.jsx         # Mood arama kutusu
│   └── SongCard.jsx      # Şarkı kartı
├── pages/
│   └── Favorites.jsx     # Favoriler sayfası
├── services/
│   ├── api.js            # OpenAI, Spotify, iTunes API
│   └── storage.js        # LocalStorage CRUD işlemleri
├── App.jsx
└── main.jsx
```

---

## ⚙️ CRUD İşlemleri

| İşlem | Açıklama |
|-------|----------|
| **Create** | Şarkıyı favorilere ekle |
| **Read** | Favori şarkıları listele |
| **Update** | Favori liste adını güncelle |
| **Delete** | Şarkıyı favorilerden çıkar |

---

## 🔧 Kurulum

### 1. Repoyu klonla

```bash
git clone https://github.com/kullanici_adin/music-mood-finder.git
cd music-mood-finder
```

### 2. Bağımlılıkları yükle

```bash
npm install
```

### 3. `.env` dosyası oluştur

```env
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxx
VITE_SPOTIFY_CLIENT_ID=xxxxxxxxx
VITE_SPOTIFY_CLIENT_SECRET=xxxxxxxxx
```

### 4. Projeyi çalıştır

```bash
npm run dev
```

---

## 🔑 API Key'leri Alma

### OpenAI API Key
1. [platform.openai.com](https://platform.openai.com/api-keys) adresine git
2. Hesap oluştur ve API key al

### Spotify API Key
1. [developer.spotify.com](https://developer.spotify.com/dashboard) adresine git
2. Yeni uygulama oluştur
3. Client ID ve Client Secret'ı kopyala

> **Not:** iTunes API ücretsiz ve key gerektirmez.

---

## 🌐 Deploy (Netlify)

1. GitHub'a push yap
2. [netlify.com](https://netlify.com)'da GitHub reposunu bağla
3. Build ayarları:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Environment Variables ekle:
   - `VITE_OPENAI_API_KEY`
   - `VITE_SPOTIFY_CLIENT_ID`
   - `VITE_SPOTIFY_CLIENT_SECRET`

---

