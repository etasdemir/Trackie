import React from 'react';

import {AuthorDetail, CoverManga, UnfinishedManga} from 'src/shared/Types';
import HorizontalMangaItem from 'src/components/HorizontalMangaItem';
import AuthorItem from './AuthorItem';
import UnfinishedMangaItem from './UnfinishedMangaItem';

export type ItemType = CoverManga | UnfinishedManga | AuthorDetail;

const isUnfinishedManga = (b: any): b is UnfinishedManga => {
  return (b as UnfinishedManga).totalChapter !== undefined;
};

const isAuthor = (b: any): b is AuthorDetail => {
  return (b as AuthorDetail).socialMediaAccounts !== undefined;
};

export function resolveComponent(item: ItemType): JSX.Element {
  if (isUnfinishedManga(item)) {
    return <UnfinishedMangaItem manga={item} />;
  } else if (isAuthor(item)) {
    return <AuthorItem author={item} />;
  } else {
    item = item as CoverManga;
    return <HorizontalMangaItem key={`${item.id}`} manga={item} />;
  }
}
