import React from 'react';
import {useSelector} from 'react-redux';

import BaseModal from 'src/modals/BaseModal';
import {RootState, useAppDispatch} from 'src/redux/AppStore';
import {DeleteDataWarnModalProp} from 'src/navigation/types';
import {deleteAllData} from 'src/redux/actions/UserActions';

function DeleteDataWarnModal(props: DeleteDataWarnModalProp) {
  const {navigation} = props;
  const language = useSelector((state: RootState) => state.user.language);
  const dispatch = useAppDispatch();

  const onDeleteAccepted = () => {
    dispatch(deleteAllData());
  };

  return (
    <BaseModal
      title={language.delete_data_warn_title}
      description={language.delete_data_warn_description}
      navigation={navigation}
      onSuccess={onDeleteAccepted}
    />
  );
}

export default DeleteDataWarnModal;
