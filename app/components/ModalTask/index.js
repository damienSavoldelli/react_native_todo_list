import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import Modal from 'react-native-modal';
import styles from './styles';

const ModalTask = ({
  task, isVisible, onHideCallback, onDeleteCallback,
}) => (
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
        <Text>Que souhaitez vous faire sur la tache</Text>
        <Text>{task.content}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Supprimer"
          onPress={() => onDeleteCallback()}
          buttonStyle={styles.deleteButton}
        />
        <Button
          title="Changer Status"
          onPress={() => onHideCallback()}
          buttonStyle={styles.changeStatusButton}
        />
      </View>
    </View>
  </Modal>
);

export default ModalTask;
