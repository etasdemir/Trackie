import React from 'react';

import Home from 'src/screens/home';
import {unfinishedManga, homeCategories} from 'src/assets/HomeComponentData';
import Category from 'src/screens/category';
import {categoryMangaList, genre} from 'src/assets/CategoryComponentData';

/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO getMangaGenres and persist.
// TODO I dropped reading this manga option
// TODO in Currently Reading, Category screens: add progress bar under the score component.
// TODO Theme and language can be hook?

function App() {
  const HomeComponent = (
    <Home unfinishedManga={unfinishedManga} categories={homeCategories} />
  );
  const CategoryComponent = (
    <Category genre={genre} categoryMangaList={categoryMangaList} />
  );

  return null;
}

export default App;
