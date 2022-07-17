import {ProfileProps} from 'src/screens/profile';
import language from 'src/shared/language';

export const stats: ProfileProps = {
  stats: [
    {
      name: language.getText('currently_reading'),
      count: 139,
    },
    {
      name: language.getText('reading_finished'),
      count: 29,
    },
    {
      name: language.getText('favourite_list'),
      count: 51,
    },
  ],
};
