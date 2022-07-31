import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {withAppStore} from 'src/redux/AppStore';
import Home from 'src/screens/home';
import {unfinishedManga, homeCategories} from 'src/assets/HomeComponentData';
import Category from 'src/screens/category';
import {categoryMangaList, genre} from 'src/assets/CategoryComponentData';
import Search from 'src/screens/search';
import {Recents, mostPopularMangaList} from 'src/assets/SearchComponentData';
import Bookmark from 'src/screens/bookmark';
import {bookmarkData} from 'src/assets/BookmarkComponentData';
import Profile from 'src/screens/profile';
import {stats} from 'src/assets/ProfileComponentData';
import AuthorDetailScreen from 'src/screens/author_detail';
import {author} from 'src/assets/AuthorDetailData';
import MangaDetailScreen from 'src/screens/manga_detail';
import {mangaDetail} from 'src/assets/MangaDetailData';
import CharacterDetailScreen from 'src/screens/character_detail';
import {character} from 'src/assets/CharacterDetailData';
import Onboarding from 'src/screens/onboarding';

/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO getMangaGenres and persist.
// TODO I dropped reading this manga option
// TODO in Currently Reading, Category screens: add progress bar under the score component.
// TODO Theme and language can be hook?
// TODO Pagination for flatlists
// TODO Icons
// TODO Search active screen
// TODO unnecessary renders and network calls check
// TODO Add repository, it would do necessary updates, cache, and decide retrieve from local or remote. Do not use Service classses directly.
// TODO currently there is only manga search.

function App() {
  const HomeComponent = (
    <Home unfinishedManga={unfinishedManga} categories={homeCategories} />
  );
  const CategoryComponent = (
    <Category genre={genre} categoryMangaList={categoryMangaList} />
  );
  const SearchComponent = (
    <Search recents={Recents} mostPopularMangaList={mostPopularMangaList} />
  );
  const BookmarkComponent = (
    <Bookmark
      currentlyReadings={bookmarkData.currentlyReadings}
      favourites={bookmarkData.favourites}
      recentlyRead={bookmarkData.recentlyRead}
      favoriteAuthors={bookmarkData.favoriteAuthors}
    />
  );
  const ProfileComponent = <Profile stats={stats.stats} />;

  const AuthorDetailComponent = <AuthorDetailScreen author={author} />;

  const MangaDetailComponent = <MangaDetailScreen manga={mangaDetail} />;

  const CharacterDetailComponent = (
    <CharacterDetailScreen character={character} />
  );

  const OnboardingComponent = <Onboarding />;

  return <NavigationContainer>{OnboardingComponent}</NavigationContainer>;
}

export default withAppStore(App);
