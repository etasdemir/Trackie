interface LanguageInterface {
  // General
  done: string;
  cancel: string;
  home: string;
  search: string;
  bookmark: string;
  profile: string;
  view_all: string;
  currently_reading: string;
  favourite_list: string;
  reviews: Function;
  settings: string;

  // Onboarding
  onboarding_title_part1: string;
  onboarding_title_part2: string;
  onboarding_start: string;

  // Home
  greeting: string;
  home_unfinished_manga: Function;

  // Search
  search_place_holder: string;
  search_recent: string;
  search_clear_recent: string;
  genre_most_popular: string;

  // Bookmark
  recently_read: string;
  favourite_authors: string;

  // Profile
  reading_finished: string;
  theme: string;
  light_theme: string;
  dark_theme: string;
  language: string;
  en: string;
  tr: string;
  clear_all_data: string;

  // Author Detail
  author_bio: string;
  author_works: string;

  // Manga Detail
  manga_ranked: Function;
  manga_popularity: Function;
  manga_members: Function;
  manga_synopsis: string;
  characters: string;
  manga_my_reading_status: string;
  manga_start_reading: string;
  manga_finish_reading: string;
  manga_finished_reading: Function;

  // Character Detail
  character_appearances: string;

  // Category
  top_mangas: string;

  // Modals
  chapter_select_title: string;
  chapter_select_description: string;
  chapter_name_with_num: Function;
  theme_select_title: string;
  theme_select_description: string;
  language_select_description: string;
  system_default: string;
  delete_data_warn_title: string;
  delete_data_warn_description: string;
}

export default LanguageInterface;
