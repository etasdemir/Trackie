import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import language from 'src/shared/language';
import Home from 'src/screens/home';
import Category from 'src/screens/category';
import Search from 'src/screens/search';
import Bookmark from 'src/screens/bookmark';
import Profile from 'src/screens/profile';
import AuthorDetailScreen from 'src/screens/author_detail';
import MangaDetailScreen from 'src/screens/manga_detail';
import CharacterDetailScreen from 'src/screens/character_detail';
import Onboarding from 'src/screens/onboarding';
import {BottomBarParamList, RootStackParamList} from './types';

const AppStack = createNativeStackNavigator<RootStackParamList>();
const BottomBar = createBottomTabNavigator<BottomBarParamList>();

function BottomBarTab() {
  return (
    <BottomBar.Navigator
      initialRouteName="bottom_bar_home"
      screenOptions={() => ({
        headerShown: false,
      })}>
      <BottomBar.Screen
        name="bottom_bar_home"
        component={Home}
        options={{title: language.getText('home')}}
      />
      <BottomBar.Screen
        name="bottom_bar_search"
        component={Search}
        options={{title: language.getText('search')}}
      />
      <BottomBar.Screen
        name="bottom_bar_bookmark"
        component={Bookmark}
        options={{title: language.getText('bookmark')}}
      />
      <BottomBar.Screen
        name="bottom_bar_profile"
        component={Profile}
        options={{title: language.getText('profile')}}
      />
    </BottomBar.Navigator>
  );
}

function AppNavigation() {
  return (
    <AppStack.Navigator
      initialRouteName="onboarding"
      screenOptions={() => ({
        headerShown: false,
      })}>
      <AppStack.Screen name="onboarding" component={Onboarding} />
      <AppStack.Screen name="category" component={Category} />
      <AppStack.Screen name="author_detail" component={AuthorDetailScreen} />
      <AppStack.Screen name="manga_detail" component={MangaDetailScreen} />
      <AppStack.Screen
        name="character_detail"
        component={CharacterDetailScreen}
      />
      <AppStack.Screen name="bottom_bar" component={BottomBarTab} />
    </AppStack.Navigator>
  );
}

export default AppNavigation;
