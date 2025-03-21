import React from 'react';
import {View, Modal, ActivityIndicator, StyleSheet} from 'react-native';

const FullLoadingScreen = ({visible}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default FullLoadingScreen;
