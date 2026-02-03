import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { AppText } from '@components';
import { styles } from '../styles';

interface CartBadgeProps {
  cartItemCount: number;
  animatedStyle: any;
}

export const CartBadge: React.FC<CartBadgeProps> = ({
  cartItemCount,
  animatedStyle,
}) => {
  if (cartItemCount <= 0) {
    return null;
  }

  return (
    <Animated.View style={[styles.cartBadge, animatedStyle]}>
      <AppText style={styles.cartBadgeText}>
        {cartItemCount > 99 ? '99+' : cartItemCount}
      </AppText>
    </Animated.View>
  );
};
