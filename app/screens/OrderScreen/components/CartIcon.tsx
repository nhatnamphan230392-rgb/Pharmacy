import React from 'react';
import { View, Image } from 'react-native';
import { CartIcon as CartIconImage } from '@assets';
import { styles } from '../styles';

interface CartIconProps {
  cartIconRef: React.RefObject<View | null>;
  onLayout: () => void;
}

export const CartIcon: React.FC<CartIconProps> = ({
  cartIconRef,
  onLayout,
}) => {
  return (
    <View 
      ref={cartIconRef as React.RefObject<View>} 
      collapsable={false}
      onLayout={onLayout}
      style={styles.cartIconWrapper}
    >
      <Image source={CartIconImage} style={styles.cartIcon} />
    </View>
  );
};
