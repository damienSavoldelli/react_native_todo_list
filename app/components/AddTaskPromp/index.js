import React from 'react';
import Prompt from 'react-native-prompt-crossplatform';
import { APP_COLORS } from '../../styles/color';
// import styles from '../AddTaskPromp/styles';


const AddTaskPromp = ({
  isVisible = false, onCancelCallback, onSubmitCallback, onChangeTextCallback,
}) => (
  <Prompt
    isVisible={isVisible}
    promptAnimation="fade"
    title="Ajouter une tâche"
    inputPlaceholder="Ex: Acheter de l'eau"
    defaultValue=""
    cancelButtonText="Annuler"
    submitButtonText="Valider"
    onChangeText={text => onChangeTextCallback(text)}
    onCancel={() => onCancelCallback()}
    onSubmit={value => onSubmitCallback(value)}
    primaryColor={APP_COLORS.accent}
  />
);

export default AddTaskPromp;
