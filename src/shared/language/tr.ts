import {StringToLang} from 'src/shared/Types';

export const tr: StringToLang = {
  // General
  home: 'Ana Sayfa',
  search: 'Arama',
  bookmark: 'Listelerim',
  profile: 'Profil',
  view_all: 'Hepsini Gör',
  currently_reading: 'Şu An Okunanlar',
  favourite_list: 'Favoriler',
  reviews: (count: number) => `${count} değerlendirme`,

  // Onboarding
  onboarding_title_part1: 'Sıradaki Harika',
  onboarding_title_part2: 'Okumanızı Bulun',
  onboarding_start: 'Başlayın',

  // Home
  greeting: 'Selam, şu anki ruh haline hangi manga uyuyor?',
  home_unfinished_manga: (date: String) =>
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
  light_theme: 'Açık Tema',
  dark_theme: 'Koyu Tema',
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

  // Character Detail
  character_appearances: 'Diğer Yapıtlar',
};
