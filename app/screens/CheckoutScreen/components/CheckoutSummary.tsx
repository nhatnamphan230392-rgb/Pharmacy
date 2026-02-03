import React from 'react';
import { View } from 'react-native';
import { AppText, AppButton } from '@components';
import { scaleHeight } from '@utils';
import { styles } from '../styles';

interface CheckoutSummaryProps {
  totalSKUs: number;
  cartItemCount: number;
  cartTotal: number;
  formatPrice: (price: number) => string;
  onConfirmOrder: () => void;
  disabled: boolean;
  bottomInset: number;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  totalSKUs,
  cartItemCount,
  cartTotal,
  formatPrice,
  onConfirmOrder,
  disabled,
  bottomInset,
}) => {
  return (
    <View style={[styles.summaryContainer, { paddingBottom: bottomInset + scaleHeight(16) }]}>
      <View style={styles.orderSummary}>
        <View style={styles.summaryDivider} />
        <AppText style={styles.summaryTitle}>Order Summary</AppText>
        <View style={styles.summaryRow}>
          <AppText style={styles.summaryLabel}>Total Items:</AppText>
          <AppText style={styles.summaryValue}>{totalSKUs}</AppText>
        </View>
        <View style={styles.summaryRow}>
          <AppText style={styles.summaryLabel}>Total Qty:</AppText>
          <AppText style={styles.summaryValue}>{cartItemCount}</AppText>
        </View>
        <View style={styles.summaryRow}>
          <AppText style={styles.summaryLabelTotal}>Subtotal:</AppText>
          <AppText style={styles.summaryValueTotal}>{formatPrice(cartTotal)}</AppText>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <AppButton
          title="Confirm Order"
          onPress={onConfirmOrder}
          disabled={disabled}
          style={styles.confirmButton}
        />
      </View>
    </View>
  );
};
