import React from 'react';
import { View } from 'react-native';
import { AppText } from '@components';
import { styles } from '../styles';

interface CategoryHeaderProps {
  title: string;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title }) => {
  return (
    <View style={styles.categoryHeader}>
      <AppText style={styles.categoryHeaderText}>{title}</AppText>
    </View>
  );
};
