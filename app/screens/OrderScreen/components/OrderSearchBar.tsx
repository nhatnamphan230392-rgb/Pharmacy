import React from 'react';
import { View, TextInput } from 'react-native';
import { AppText } from '@components';
import { styles } from '../styles';

interface OrderSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const OrderSearchBar: React.FC<OrderSearchBarProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.searchSection}>
      <View style={styles.searchBar}>
        <AppText style={styles.searchIcon}>🔍</AppText>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};
