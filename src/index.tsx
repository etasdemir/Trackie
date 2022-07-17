import React from 'react';

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

/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO getMangaGenres and persist.
// TODO I dropped reading this manga option
// TODO in Currently Reading, Category screens: add progress bar under the score component.
// TODO Theme and language can be hook?
// TODO Pagination for flatlists
// TODO Icons

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

  return <Profile stats={stats.stats} />;
}

export default App;
