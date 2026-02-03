import React from 'react';
import { View } from 'react-native';
import { AppText } from '@components';
import { Product } from '../useProps';
import { styles } from '../styles';

interface CheckoutOrderItemProps {
  item: {
    id: number | string;
    name: string;
    price: number;
    quantity: number;
  };
  productInfo: Product | null;
  formatPrice: (price: number) => string;
}

export const CheckoutOrderItem: React.FC<CheckoutOrderItemProps> = ({
  item,
  productInfo,
  formatPrice,
}) => {
  const itemTotal = item.price * item.quantity;

  return (
    <View style={styles.orderItem}>
      <View style={styles.productDetails}>
        <View style={styles.productHeader}>
          <View style={styles.productNameContainer}>
            <AppText style={styles.productName}>{item.name}</AppText>
            {productInfo?.isPrescription && (
              <View style={styles.rxTag}>
                <AppText style={styles.rxText}>Rx</AppText>
              </View>
            )}
          </View>
        </View>
        <AppText style={styles.productCategory}>
          {productInfo?.category || 'Unknown'}
        </AppText>
        <AppText style={styles.unitPrice}>{formatPrice(item.price)}</AppText>
      </View>

      <View style={styles.priceQuantity}>
        <AppText style={styles.totalPrice}>{formatPrice(itemTotal)}</AppText>
        <AppText style={styles.quantity}>x {item.quantity}</AppText>
      </View>
    </View>
  );
};
