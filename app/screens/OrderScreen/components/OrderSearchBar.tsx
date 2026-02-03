import React from 'react';
import { View, TextInput, Image } from 'react-native';
import { styles } from '../styles';
import { SearchIcon } from '@assets/images';

interface OrderSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const OrderSearchBar: React.FC<OrderSearchBarProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.searchSection}>
      <View style={styles.searchBar}>
        <Image source={SearchIcon} style={styles.searchIcon} />
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
