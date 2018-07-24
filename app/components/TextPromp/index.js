import React from 'react';
import Prompt from 'react-native-prompt-crossplatform';
import { translate } from 'react-i18next';

import { APP_COLORS } from '../../styles/color';
// import styles from '../AddTaskPromp/styles';


const TextPromp = (props) => {
  const {
    onCancelCallback, onSubmitCallback, onChangeTextCallback, defaultValue, t,
  } = props;

  let {
    isVisible, title, placeholder,
  } = props;

  if (typeof isVisible !== 'boolean') { isVisible = false; }
  if (typeof title !== 'string') { title = t('home:new_task.title'); }
  if (typeof placeholder !== 'string') { placeholder = t('home:new_task.placeholder'); }

  return (
    <Prompt
      isVisible={isVisible}
      promptAnimation="fade"
      title={title}
      inputPlaceholder={placeholder}
      defaultValue={(typeof defaultValue === 'object') ? defaultValue.content : ''}
      cancelButtonText={t('common:actions.cancel')}
      submitButtonText={t('common:actions.submit')}
      onChangeText={text => onChangeTextCallback(text)}
      onCancel={() => onCancelCallback()}
      onSubmit={value => onSubmitCallback(value)}
      primaryColor={APP_COLORS.accent}
      onBackButtonPress={() => onCancelCallback()}
    />
  );
};

export default translate(['home', 'common'], { wait: true })(TextPromp);
