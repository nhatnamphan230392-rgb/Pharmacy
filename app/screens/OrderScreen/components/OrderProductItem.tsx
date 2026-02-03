import React, { useRef } from 'react';
import { View } from 'react-native';
import { AppText } from '@components';
import { AppButton } from '@components';
import { Product } from '../useProps';
import { styles } from '../styles';

interface OrderProductItemProps {
  item: Product;
  quantity: number;
  onQuantityChange: (product: Product, change: number) => void;
  onButtonPress?: (x: number, y: number) => void;
  formatPrice: (price: number) => string;
}

export const OrderProductItem: React.FC<OrderProductItemProps> = ({
  item,
  quantity,
  onQuantityChange,
  onButtonPress,
  formatPrice,
}) => {
  const productNameRef = useRef<View>(null);
  const lastPressTimeRef = useRef<number>(0);
  const throttleDelay = 300;

  if (!item || !item.id) {
    return null;
  }

  const handlePlusPress = () => {
    const now = Date.now();
    const timeSinceLastPress = now - lastPressTimeRef.current;

    if (timeSinceLastPress >= throttleDelay) {
      lastPressTimeRef.current = now;

      if (productNameRef.current && onButtonPress) {
        try {
          requestAnimationFrame(() => {
            productNameRef.current?.measureInWindow((x, y, width, height) => {
              const centerX = x + width / 2;
              const centerY = y + height / 2;
              onButtonPress(centerX, centerY);
            });
          });
        } catch (error) {
          console.warn('Failed to measure product name position:', error);
        }
      }
      onQuantityChange(item, 1);
    }
  };

  const safeQuantity = typeof quantity === 'number' ? quantity : 0;
  const safePrice = typeof item.price === 'number' ? item.price : 0;

  return (
    <View style={styles.productItem}>
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <View ref={productNameRef} collapsable={false}>
            <AppText style={styles.productName}>{item.name || ''}</AppText>
          </View>
          {item.isPrescription && (
            <View style={styles.rxTag}>
              <AppText style={styles.rxText}>Rx</AppText>
            </View>
          )}
        </View>
        <AppText style={styles.productCategory}>{item.category || ''}</AppText>
        <AppText style={styles.productPrice}>{formatPrice(safePrice)}</AppText>
      </View>
      <View style={styles.quantitySelector}>
        <AppButton
          title="—"
          onPress={() => onQuantityChange(item, -1)}
          disabled={safeQuantity === 0}
          style={styles.quantityButton}
          textStyle={[styles.quantityButtonText, safeQuantity === 0 && styles.quantityButtonDisabled]}
        />
        <View style={styles.quantityDisplay}>
          <AppText style={styles.quantityText}>{safeQuantity}</AppText>
        </View>
        <AppButton
          title="+"
          onPress={handlePlusPress}
          disabled={safeQuantity >= 99}
          style={styles.quantityButton}
          textStyle={[styles.quantityButtonText, safeQuantity >= 99 && styles.quantityButtonDisabled]}
        />
      </View>
    </View>
  );
};
