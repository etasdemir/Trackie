import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {withAppStore} from 'src/redux/AppStore';
import AppNavigation from 'src/navigation';

// TODO getMangaGenres and persist.
// TODO I dropped reading this manga option
// TODO in Currently Reading, Category screens: add progress bar under the score component.
// TODO Theme and language can be hook?
// TODO Pagination for flatlists
// TODO Icons
// TODO Search active screen
// TODO unnecessary renders and network calls check
// TODO Add repository, it would do necessary updates, cache, and decide retrieve from local or remote. Do not use Service classses directly. isFetched[genre.id] eğer bir item fetching haldeyse tekrar çağrıldığında bir şey yapmamalı ve bu kod repositoryde olmalı.
// TODO currently there is only manga search.
// TODO Skeleton while waiting for network response
// TODO Status bar, app icon, theme, language
// TODO Home first genre is Top Manga

function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}

export default withAppStore<typeof App>(App);
