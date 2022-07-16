import React from 'react';

import Home from 'src/screens/home';
import {unfinishedManga, homeCategories} from 'src/assets/HomeComponentData';
import Category from 'src/screens/category';
import {categoryMangaList, genre} from 'src/assets/CategoryComponentData';
import Search from 'src/screens/search';
import {Recents, mostPopularMangaList} from 'src/assets/SearchComponentData';

/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO getMangaGenres and persist.
// TODO I dropped reading this manga option
// TODO in Currently Reading, Category screens: add progress bar under the score component.
// TODO Theme and language can be hook?
// TODO Pagination for flatlists

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

  return null;
}

export default App;
