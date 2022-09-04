import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {Appearance} from 'react-native';

import BaseModal from 'src/modals/BaseModal';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {ThemeSelectionModalProp} from 'src/navigation/types';
import {THEME} from 'src/shared/Constant';
import RadioButton from 'src/components/RadioButton';
import {setThemeAction} from 'src/redux/actions/UserActions';

function ThemeSelectModal(props: ThemeSelectionModalProp) {
  const {navigation} = props;
  const language = useSelector((state: RootState) => state.user.language);
  const persistedTheme = useSelector(
    (state: RootState) => state.user.persisted_theme,
  );
  const dispatch = useAppDispatch();
  const title = language.theme_select_title;
  const description = language.theme_select_description;

  const [selectedOption, setSelectedOption] = useState({
    theme: persistedTheme.theme,
    isDevice: persistedTheme.isDeviceTheme,
  });

  const onSaveTheme = useCallback(() => {
    dispatch(
      setThemeAction({
        theme: selectedOption.theme,
        isDeviceTheme: selectedOption.isDevice,
      }),
    );
  }, [dispatch, selectedOption]);

  const systemTheme = Appearance.getColorScheme() ?? persistedTheme.theme;

  return (
    <BaseModal
      title={title}
      description={description}
      navigation={navigation}
      onSuccess={onSaveTheme}>
      <>
        <RadioButton
          name={language.light_theme}
          onPress={() =>
            setSelectedOption({theme: THEME.LIGHT, isDevice: false})
          }
          isEnabled={
            selectedOption.theme === THEME.LIGHT && !selectedOption.isDevice
          }
        />
        <RadioButton
          name={language.dark_theme}
          onPress={() =>
            setSelectedOption({theme: THEME.DARK, isDevice: false})
          }
          isEnabled={
            selectedOption.theme === THEME.DARK && !selectedOption.isDevice
          }
        />
        <RadioButton
          name={language.system_default}
          onPress={() =>
            setSelectedOption({theme: systemTheme, isDevice: true})
          }
          isEnabled={selectedOption.isDevice}
        />
      </>
    </BaseModal>
  );
}

export default ThemeSelectModal;
