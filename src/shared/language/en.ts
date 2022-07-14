import {StringToLang} from 'src/shared/Types';

export const en: StringToLang = {
  // General
  home: 'Home',
  search: 'Search',
  bookmark: 'Bookmark',
  profile: 'Profile',
  view_all: 'View All',
  currently_reading: 'Currently Reading',
  favourite_list: 'Favourites',
  reviews: (count: number) => `${count} reviews`,

  // Onboarding
  onboarding_title_part1: 'Find Your Next',
  onboarding_title_part2: 'Great Read',
  onboarding_start: 'Get Started',

  // Home
  greeting: 'Hello, which manga suits your current mood?',
  home_unfinished_manga: (date: String) =>
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
  light_theme: 'Light Theme',
  dark_theme: 'Dark Theme',
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

  // Character Detail
  character_appearances: 'Appearances',
};
