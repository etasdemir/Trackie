import LanguageInterface from './languageInterface';

export const en: LanguageInterface = {
  // General
  done: 'Done',
  cancel: 'Cancel',
  home: 'Home',
  search: 'Search',
  bookmark: 'Bookmark',
  profile: 'Profile',
  view_all: 'View All',
  currently_reading: 'Currently Reading',
  favourite_list: 'Favourites',
  reviews: (score: number, scoredBy: number) =>
    `${score.toFixed(1)} / ${scoredBy} reviews`,
  settings: 'Settings',

  // Onboarding
  onboarding_title_part1: 'Find Your Next',
  onboarding_title_part2: 'Great Read',
  onboarding_start: 'Get Started',

  // Home
  greeting: 'Hello, which manga suits your current mood?',
  home_unfinished_manga: (date: string) =>
    `Remember, you have an unfinished manga since ${date}`,

  // Search
  search_place_holder: 'Search manga, characters, or authors',
  search_recent: 'Recent',
  search_clear_recent: 'Clear All',
  genre_most_popular: 'Most Populars',

  // Bookmark
  recently_read: 'Recently Read',
  favourite_authors: 'Favourite Authors',

  // Profile
  reading_finished: 'Finished',
  theme: 'Theme',
  light_theme: 'Light theme',
  dark_theme: 'Dark theme',
  language: 'Language',
  en: 'English',
  tr: 'Türkçe',
  clear_all_data: 'Clear all data',

  // Author Detail
  author_bio: 'Bio',
  author_works: 'Works',

  // Manga Detail
  manga_ranked: (rank: number) => `Ranked #${rank}`,
  manga_popularity: (rank: number) => `Popularity #${rank}`,
  manga_members: (rank: number) => `Members #${rank}`,
  manga_synopsis: 'Synopsis',
  characters: 'Characters',
  manga_my_reading_status: 'My Reading Status:',
  manga_start_reading: 'Start Reading',
  manga_finish_reading: 'Finish',
  manga_finished_reading: (date: string) => `Finished on ${date}`,

  // Character Detail
  character_appearances: 'Appearances',

  // Category
  top_mangas: 'Top Manga',

  // Modals
  chapter_select_title: 'Chapter Selection',
  chapter_select_description: 'Select the last chapter you were on:',
  chapter_name_with_num: (chapter: number) => `Chapter: ${chapter}`,
  theme_select_title: 'Appereance',
  theme_select_description:
    'Select the theme to be applied throughout the application.',
  language_select_description:
    'Select the language to be applied throughout the application.',
  system_default: 'System default',
  delete_data_warn_title: 'Delete All Data',
  delete_data_warn_description:
    'Are you sure you want to delete all of your data?',
};
