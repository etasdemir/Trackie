import LanguageInterface from './languageInterface';

export const tr: LanguageInterface = {
  // General
  done: 'Tamam',
  cancel: 'Kapat',
  home: 'Ana Sayfa',
  search: 'Arama',
  bookmark: 'Listelerim',
  profile: 'Profil',
  view_all: 'Hepsini Gör',
  currently_reading: 'Şu An Okunanlar',
  favourite_list: 'Favoriler',
  reviews: (score: number, scoredBy: number) =>
    `${score.toFixed(1)} / ${scoredBy} değerlendirme`,
  settings: 'Ayarlar',

  // Onboarding
  onboarding_title_part1: 'Sıradaki Harika',
  onboarding_title_part2: 'Okumanızı Bulun',
  onboarding_start: 'Başlayın',

  // Home
  greeting: 'Selam, şu anki ruh haline hangi manga uyuyor?',
  home_unfinished_manga: (date: string) =>
    `Unutma, ${date} tarihinden beri bitmemiş bir mangan var.`,

  // Search
  search_place_holder: 'Manga, karakter veya yazar ara',
  search_recent: 'Yakın zamanda',
  search_clear_recent: 'Temizle',
  genre_most_popular: 'En Popülerler',

  // Bookmark
  recently_read: 'Yakın Zamanda Okunanlar',
  favourite_authors: 'Favori Yazarlar',

  // Profile
  reading_finished: 'Bitenler',
  theme: 'Tema',
  light_theme: 'Açık tema',
  dark_theme: 'Koyu tema',
  language: 'Dil',
  en: 'English',
  tr: 'Türkçe',
  clear_all_data: 'Tüm verileri temizle',

  // Author Detail
  author_bio: 'Hakkında',
  author_works: 'Yapıtları',

  // Manga Detail
  manga_ranked: (rank: number) => `Sıralama #${rank}`,
  manga_popularity: (rank: number) => `Popülerlik #${rank}`,
  manga_members: (rank: number) => `Üyeler #${rank}`,
  manga_synopsis: 'Özet',
  characters: 'Karakterler',
  manga_my_reading_status: 'Okuma Durumum:',
  manga_start_reading: 'Okumaya Başla',
  manga_finish_reading: 'Bitir',
  manga_finished_reading: (date: string) => `Bitirme tarihi ${date}`,

  // Character Detail
  character_appearances: 'Diğer Yapıtlar',

  // Category
  top_mangas: 'En İyiler',

  // Modals
  chapter_select_title: 'Bölüm Seçimi',
  chapter_select_description: 'Okuduğunuz son bölümü seçin:',
  chapter_name_with_num: (chapter: number) => `Bölüm: ${chapter}`,
  theme_select_title: 'Görünüm',
  theme_select_description: 'Uygulama genelinde kullanılacak temayı seçiniz.',
  language_select_description: 'Uygulama genelinde kullanılacak dili seçiniz.',
  system_default: 'Sistem varsayılanı',
  delete_data_warn_title: 'Tüm Verileri Sil',
  delete_data_warn_description:
    'Tüm verilerinizi silmek istediğinizden emin misiniz?',
};
