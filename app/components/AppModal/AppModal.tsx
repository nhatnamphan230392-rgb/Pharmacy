import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '@components';
import { AppButton } from '@components';
import { scaleWidth, scaleHeight, scaleFont } from '@utils';
import { FontWeight } from '@services';
import { Colors } from '../../screens/OrderScreen/constants/colors';

interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

export const AppModal: React.FC<AppModalProps> = ({
  visible,
  onClose,
  title = 'Order Confirmed!',
  message = 'Your order has been placed successfully.\nThank you!',
  buttonText = 'Back to Home',
  onButtonPress,
}) => {
  const handleButtonPress = () => {
    if (onButtonPress) {
      onButtonPress();
    } else {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <AppText style={styles.title}>{title}</AppText>
            
            <View style={styles.iconContainer}>
              <View style={styles.checkmarkCircle}>
                <AppText style={styles.checkmark}>✓</AppText>
              </View>
            </View>

            <AppText style={styles.message}>{message}</AppText>
          </View>

          <View style={styles.buttonContainer}>
            <AppButton
              title={buttonText}
              onPress={handleButtonPress}
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(20),
  },
  modalContainer: {
    backgroundColor: Colors.BACKGROUND_WHITE,
    borderRadius: scaleWidth(16),
    width: '100%',
    maxWidth: scaleWidth(400),
    paddingHorizontal: scaleWidth(24),
    paddingTop: scaleHeight(40),
    paddingBottom: scaleHeight(24),
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: scaleFont(24),
    ...FontWeight.FONT_WEIGHT_700,
    color: Colors.TEXT_DARK,
    textAlign: 'center',
    marginBottom: scaleHeight(24),
  },
  iconContainer: {
    marginBottom: scaleHeight(24),
  },
  checkmarkCircle: {
    width: scaleWidth(80),
    height: scaleWidth(80),
    borderRadius: scaleWidth(40),
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: scaleFont(48),
    color: Colors.TEXT_WHITE,
    ...FontWeight.FONT_WEIGHT_700,
    lineHeight: scaleFont(48),
  },
  message: {
    fontSize: scaleFont(16),
    ...FontWeight.FONT_WEIGHT_400,
    color: Colors.TEXT_GRAY,
    textAlign: 'center',
    lineHeight: scaleFont(24),
    marginBottom: scaleHeight(32),
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
    paddingVertical: scaleHeight(14),
    backgroundColor: Colors.PRIMARY_BLUE,
    borderRadius: scaleWidth(8),
  },
});
