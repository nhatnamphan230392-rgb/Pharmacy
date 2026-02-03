import React from 'react';
import { View } from 'react-native';
import { AppText } from '@components';
import { styles } from '../styles';

interface EmptyStateProps {
  isSearch: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ isSearch }) => {
  return (
    <View style={styles.emptyState}>
      <AppText style={styles.emptyStateTitle}>
        {isSearch ? 'No products found' : 'No products available'}
      </AppText>
      <AppText style={styles.emptyStateMessage}>
        {isSearch
          ? 'Try adjusting your search or filter to find what you\'re looking for.'
          : 'There are no products in this category at the moment.'}
      </AppText>
    </View>
  );
};
