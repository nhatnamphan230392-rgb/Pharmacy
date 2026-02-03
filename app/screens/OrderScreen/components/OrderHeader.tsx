import React from 'react';
import { View } from 'react-native';
import { AppText } from '@components';
import { styles } from '../styles';

export const OrderHeader = () => {
  return (
    <View style={styles.header}>
      <AppText style={styles.headerTitle}>Quick Order</AppText>
    </View>
  );
};
