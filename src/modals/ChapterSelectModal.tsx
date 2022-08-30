import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';

import {RootState} from 'src/redux/AppStore';
import {ColorProps} from 'src/shared/Types';
import {ChapterSelectionModalProp} from 'src/navigation/types';
import BaseModal from './BaseModal';

function ChapterSelectModal(props: ChapterSelectionModalProp) {
  const {navigation} = props;
  const theme = useSelector((state: RootState) => state.user.theme);
  const title = 'Chapter Selection';
  const description = 'Select the last chapter you were on:';
  const onSuccess = () => {};
  const onCancel = () => {};

  return (
    <BaseModal
      title={title}
      description={description}
      onSuccess={onSuccess}
      onCancel={onCancel}
      navigation={navigation}>
      <></>
    </BaseModal>
  );
}

export default ChapterSelectModal;
