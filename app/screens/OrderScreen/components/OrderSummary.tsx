import React from 'react';
import { View } from 'react-native';
import { AppText } from '@components';
import { AppButton } from '@components';
import { useOrderSummary } from '../hooks/useOrderSummary';
import { CartIcon } from './CartIcon';
import { CartBadge } from './CartBadge';
import { styles } from '../styles';

interface OrderSummaryProps {
  totalItems: number;
  cartItemCount: number;
  cartTotal: number;
  formatPrice: (price: number) => string;
  onReviewOrder: () => void;
  onCartIconLayout?: (x: number, y: number) => void;
  onAnimationComplete?: () => void;
  disabled: boolean;
  bottomInset?: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalItems,
  cartItemCount,
  cartTotal,
  formatPrice,
  onReviewOrder,
  onCartIconLayout,
  onAnimationComplete,
  disabled,
  bottomInset = 0,
}) => {
  const { cartIconRef, badgeAnimatedStyle, measureCartIcon } = useOrderSummary({
    cartItemCount,
    onCartIconLayout,
  });

  return (
    <View style={[styles.bottomBar, { paddingBottom: bottomInset }]}>
      <View style={styles.summary}>
        <View style={styles.summaryHeader}>
          <AppText style={styles.summaryTitle}>Order Summary</AppText>
          <View style={styles.cartIconContainer}>
            <CartIcon cartIconRef={cartIconRef} onLayout={measureCartIcon} />
            <CartBadge cartItemCount={cartItemCount} animatedStyle={badgeAnimatedStyle} />
          </View>
        </View>
        <View style={styles.summaryDetails}>
          <View style={styles.summaryRow}>
            <AppText style={styles.summaryLabel}>Total SKUs:</AppText>
            <AppText style={styles.summaryValue}>{totalItems}</AppText>
          </View>
          <View style={styles.summaryRow}>
            <AppText style={styles.summaryLabel}>Total Quantity:</AppText>
            <AppText style={styles.summaryValue}>{cartItemCount}</AppText>
          </View>
          <View style={[styles.summaryRow, styles.summaryRowTotal]}>
            <AppText style={styles.summaryLabelTotal}>Total Amount:</AppText>
            <AppText style={styles.summaryValueTotal}>{formatPrice(cartTotal)}</AppText>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Review Order"
          onPress={onReviewOrder}
          disabled={disabled}
          style={styles.reviewButton}
        />
      </View>
    </View>
  );
};
