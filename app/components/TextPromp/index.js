import React from 'react';
import Prompt from 'react-native-prompt-crossplatform';
import { APP_COLORS } from '../../styles/color';
// import styles from '../AddTaskPromp/styles';


const TextPromp = ({
  isVisible = false,
  onCancelCallback,
  onSubmitCallback,
  onChangeTextCallback,
  title = 'Ajouter une tâche',
  placeholder = "Ex: Acheter de l'eau",
  defaultValue = '',
}) => (
  <Prompt
    isVisible={isVisible}
    promptAnimation="fade"
    title={title}
    inputPlaceholder={placeholder}
    defaultValue={(typeof defaultValue === 'object') ? defaultValue.content : ''}
    cancelButtonText="Annuler"
    submitButtonText="Valider"
    onChangeText={text => onChangeTextCallback(text)}
    onCancel={() => onCancelCallback()}
    onSubmit={value => onSubmitCallback(value)}
    primaryColor={APP_COLORS.accent}
  />
);

export default TextPromp;
