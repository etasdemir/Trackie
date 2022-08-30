import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

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
import {RootState} from 'src/redux/AppStore';
import ChapterSelectModal from 'src/modals/ChapterSelectModal';

const AppStack = createNativeStackNavigator<RootStackParamList>();
const BottomBar = createBottomTabNavigator<BottomBarParamList>();

function BottomBarTab() {
  const theme = useSelector((state: RootState) => state.user.theme);

  return (
    <BottomBar.Navigator
      initialRouteName="bottom_bar_home"
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: theme.primaryDark,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          borderRadius: 30,
        },
        tabBarLabelStyle: {
          marginBottom: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      })}>
      <BottomBar.Screen
        name="bottom_bar_home"
        component={Home}
        options={{
          title: language.getText('home'),
          tabBarIcon: ({focused, size, color}) => {
            return (
              <MCIIcon
                size={size}
                name={focused ? 'home-variant' : 'home-variant-outline'}
                color={color}
              />
            );
          },
        }}
      />
      <BottomBar.Screen
        name="bottom_bar_search"
        component={Search}
        options={{
          title: language.getText('search'),
          tabBarIcon: ({focused, size, color}) => {
            return (
              <MIIcon
                size={size}
                name={focused ? 'search' : 'search'}
                color={color}
              />
            );
          },
        }}
      />
      <BottomBar.Screen
        name="bottom_bar_bookmark"
        component={Bookmark}
        options={{
          title: language.getText('bookmark'),
          tabBarIcon: ({focused, size, color}) => {
            return (
              <MCIIcon
                size={size}
                name={
                  focused ? 'bookmark-multiple' : 'bookmark-multiple-outline'
                }
                color={color}
              />
            );
          },
        }}
      />
      <BottomBar.Screen
        name="bottom_bar_profile"
        component={Profile}
        options={{
          title: language.getText('profile'),
          tabBarIcon: ({focused, size, color}) => {
            return (
              <MCIIcon
                size={size}
                name={focused ? 'account' : 'account-outline'}
                color={color}
              />
            );
          },
        }}
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
      <AppStack.Group
        screenOptions={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}>
        <AppStack.Screen
          name="chapter_selection_modal"
          component={ChapterSelectModal}
        />
      </AppStack.Group>
    </AppStack.Navigator>
  );
}

export default AppNavigation;
