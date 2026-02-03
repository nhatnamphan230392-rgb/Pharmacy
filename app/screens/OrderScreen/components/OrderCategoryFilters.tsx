import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { AppText } from '@components';
import { styles } from '../styles';

interface OrderCategoryFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  scrollRef?: React.RefObject<ScrollView | null>;
}

export const OrderCategoryFilters: React.FC<OrderCategoryFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  scrollRef,
}) => {
  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryScroll}
      contentContainerStyle={styles.categoryContainer}>
      {categories.map((category: string, index: number) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.categoryButtonActive,
            index === categories.length - 1 && styles.categoryButtonLast,
          ]}
          onPress={() => onSelectCategory(category)}>
          <AppText
            numberOfLines={1}
            style={[
              styles.categoryButtonText,
              selectedCategory === category && styles.categoryButtonTextActive,
            ]}>
            {category}
          </AppText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
