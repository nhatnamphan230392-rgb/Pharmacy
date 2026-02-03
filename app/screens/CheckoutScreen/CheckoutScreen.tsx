import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppModal } from '@components';
import { useCheckoutScreen } from './useProps';
import { styles } from './styles';
import {
  CheckoutHeader,
  CheckoutOrderItem,
  CheckoutSummary,
} from './components';

const CheckoutScreen = () => {
  const insets = useSafeAreaInsets();
  const {
    cartItems,
    cartTotal,
    cartItemCount,
    totalSKUs,
    showSuccessModal,
    getProductInfo,
    formatPrice,
    handleBack,
    handleConfirmOrder,
    handleBackToHome,
  } = useCheckoutScreen();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CheckoutHeader onBack={handleBack} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => {
          const productInfo = getProductInfo(item.id);
          return (
            <CheckoutOrderItem
              key={item.id}
              item={item}
              productInfo={productInfo}
              formatPrice={formatPrice}
            />
          );
        })}
      </ScrollView>

      <CheckoutSummary
        totalSKUs={totalSKUs}
        cartItemCount={cartItemCount}
        cartTotal={cartTotal}
        formatPrice={formatPrice}
        onConfirmOrder={handleConfirmOrder}
        disabled={cartItems.length === 0}
        bottomInset={insets.bottom}
      />

      <AppModal
        visible={showSuccessModal}
        onClose={handleBackToHome}
        onButtonPress={handleBackToHome}
      />
    </SafeAreaView>
  );
};

export default CheckoutScreen;
