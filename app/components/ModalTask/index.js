import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { translate } from 'react-i18next';

import styles from './styles';

const ModalTask = (props) => {
  const {
    task, isVisible, onHideCallback, onDeleteCallback, onChangeStatusCallback, t,
  } = props;

  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1000}
      onBackdropPress={() => onHideCallback()}
    >
      <View style={styles.modal}>
        <View style={styles.title}>
          <Text>{t('home:modal_task.title')}</Text>
          <Text>{(typeof task === 'object') ? task.content : ''}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={t('home:modal_task.delete')}
            onPress={() => onDeleteCallback()}
            buttonStyle={styles.deleteButton}
          />
          <Button
            title={t('home:modal_task.change_status')}
            onPress={() => onChangeStatusCallback()}
            buttonStyle={styles.changeStatusButton}
          />
        </View>
      </View>
    </Modal>
  );
};

export default translate(['home', 'common'], { wait: true })(ModalTask);
