import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';

import {RootState, useAppDispatch} from 'src/redux/AppStore';
import BaseModal from './BaseModal';
import {LanguageSelectionModalProp} from 'src/navigation/types';
import RadioButton from 'src/components/RadioButton';
import {LANGUAGE} from 'src/shared/Constant';
import {languageStore} from 'src/shared/language';
import {setLanguageAction} from 'src/redux/actions/UserActions';

function LanguageSelectModal(props: LanguageSelectionModalProp) {
  const {navigation} = props;
  const language = useSelector((state: RootState) => state.user.language);
  const persistedLanguage = useSelector(
    (state: RootState) => state.user.persisted_language,
  );
  const dispatch = useAppDispatch();

  const [selectedOption, setSelectedOption] = useState({
    language: persistedLanguage.language,
    isDevice: persistedLanguage.isDeviceLanguage,
  });

  const onSaveLanguage = useCallback(() => {
    dispatch(
      setLanguageAction({
        language: selectedOption.language,
        isDeviceLanguage: selectedOption.isDevice,
      }),
    );
  }, [dispatch, selectedOption]);

  return (
    <BaseModal
      title={language.language}
      description={language.language_select_description}
      onSuccess={onSaveLanguage}
      navigation={navigation}>
      <>
        <RadioButton
          name={language.en}
          onPress={() =>
            setSelectedOption({language: LANGUAGE.ENGLISH, isDevice: false})
          }
          isEnabled={
            selectedOption.language === LANGUAGE.ENGLISH &&
            !selectedOption.isDevice
          }
        />
        <RadioButton
          name={language.tr}
          onPress={() =>
            setSelectedOption({language: LANGUAGE.TURKISH, isDevice: false})
          }
          isEnabled={
            selectedOption.language === LANGUAGE.TURKISH &&
            !selectedOption.isDevice
          }
        />
        <RadioButton
          name={language.system_default}
          onPress={() =>
            setSelectedOption({
              language: languageStore.getDefaultLanguage(),
              isDevice: true,
            })
          }
          isEnabled={selectedOption.isDevice}
        />
      </>
    </BaseModal>
  );
}

export default LanguageSelectModal;
