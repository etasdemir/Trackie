import React from 'react';

import Home from 'src/screens/home';

const data = {
  unfinishedMangaList: [
    {
      id: '1',
      img: 'https://cdn.myanimelist.net/images/manga/1/259286.jpg',
      title: 'Mahou Sensei Negima!',
      currentChapter: 121,
      totalChapter: 355,
      author: 'Akamatsu, Ken',
      synopsis:
        'Negi Springfield, a 10-year-old wizard who recently graduated from Merdiana Magic Academy in Wales, hopes to achieve two things—to find his missing father, who was once known as the Thousand Master, and to become a Magister Magi, someone who helps the everyday world through magic. To reach his latter goal, he is assigned one last task: to teach English at a middle school in Japan. Much to his surprise and dismay, he not only discovers that his homeroom class consists of 31 girls, but also ends up revealing his true identity as a magician to Asuna Kagurazaka, one of his new students. Negi must now negotiate with the girl and face his most difficult challenge yet—to keep his identity a secret as he tackles magical threats both from within and outside of Mahora Academy, all the while keeping a watchful eye out for his lost father. [Written by MAL Rewrite]',
    },
  ],
  category1: {
    url: 'https://api.jikan.moe/v4/manga?type=manga&genres=1&page=1',
    pagination: {
      lastVisiblePage: 365,
      hasNextPage: true,
      currentPage: 1,
      items: {
        count: 25,
        per_page: 25,
      },
    },
    data: [
      {
        id: '1',
        img: 'https://cdn.myanimelist.net/images/manga/1/259286.jpg',
        title: 'Mahou Sensei Negima!',
        author: 'Akamatsu, Ken',
        synopsis:
          'Negi Springfield, a 10-year-old wizard who recently graduated from Merdiana Magic Academy in Wales, hopes to achieve two things—to find his missing father, who was once known as the Thousand Master, and to become a Magister Magi, someone who helps the everyday world through magic. To reach his latter goal, he is assigned one last task: to teach English at a middle school in Japan. Much to his surprise and dismay, he not only discovers that his homeroom class consists of 31 girls, but also ends up revealing his true identity as a magician to Asuna Kagurazaka, one of his new students. Negi must now negotiate with the girl and face his most difficult challenge yet—to keep his identity a secret as he tackles magical threats both from within and outside of Mahora Academy, all the while keeping a watchful eye out for his lost father. [Written by MAL Rewrite]',
        score: 7.95,
      },
    ],
  },
};

// TODO getMangaGenres and persist.
// TODO I dropped reading this manga option
// TODO in Currently Reading, Category screens: add progress bar under the score component.
// TODO Theme and language can be hook?

function App() {
  return <Home />;
}

export default App;
