import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { AppText } from '@components';
import { BackIcon } from '@assets';
import { styles } from '../styles';

interface CheckoutHeaderProps {
  onBack: () => void;
}

export const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ onBack }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Image source={BackIcon} style={styles.backIcon} />
      </TouchableOpacity>
      <AppText style={styles.headerTitle}>Review Order</AppText>
      <View style={styles.headerRight} />
    </View>
  );
};
