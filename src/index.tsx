import React from 'react';
import {unfinishedManga, homeCategories} from 'src/assets/HomeComponentData';

import Home from 'src/screens/home';

// TODO getMangaGenres and persist.
// TODO I dropped reading this manga option
// TODO in Currently Reading, Category screens: add progress bar under the score component.
// TODO Theme and language can be hook?

function App() {
  return <Home unfinishedManga={unfinishedManga} categories={homeCategories} />;
}

export default App;
