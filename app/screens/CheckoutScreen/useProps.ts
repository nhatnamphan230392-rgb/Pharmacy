import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@redux';
import { clearCart } from '@redux';
import { SCREEN_ROUTE } from '@navigation';

const productsData = require('../../../data.json');

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  isPrescription: boolean;
}

export const useCheckoutScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const cartTotal = useAppSelector(state => state.cart.total);
  const cartItemCount = useAppSelector(state => state.cart.itemCount);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const getProductInfo = (productId: number | string): Product | null => {
    const product = productsData.find((p: Product) => p.id === Number(productId));
    return product || null;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' ₫';
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleConfirmOrder = () => {
    setShowSuccessModal(true);
    dispatch(clearCart());
  };

  const handleBackToHome = () => {
    setShowSuccessModal(false);
    navigation.navigate(SCREEN_ROUTE.ORDER_SCREEN as never);
  };

  const totalSKUs = cartItems.length;

  return {
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
  };
};

export type { Product };
