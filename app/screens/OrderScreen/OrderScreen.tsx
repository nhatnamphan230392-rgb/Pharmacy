import React, { useEffect } from 'react';
import { View, SectionList, SectionListData } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOrderScreen, ProductSection, Product } from './useProps';
import { useCartAnimation } from './hooks/useCartAnimation';
import { styles } from './styles';
import {
  OrderHeader,
  OrderSearchBar,
  OrderCategoryFilters,
  OrderProductItem,
  OrderSummary,
  CategoryHeader,
  CartAnimation,
  EmptyState,
} from './components';

const BOTTOM_BAR_HEIGHT = 180;

const OrderScreen = () => {
  const insets = useSafeAreaInsets();
  
  useEffect(() => {
  }, []);

  let orderScreenProps;
  let cartAnimationProps;

  try {
    orderScreenProps = useOrderScreen();
  } catch (error) {
    throw error;
  }

  try {
    cartAnimationProps = useCartAnimation();
  } catch (error) {
    throw error;
  }

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    categories,
    productSections,
    cartItems,
    cartTotal,
    cartItemCount,
    totalItems,
    getQuantity,
    onChangeQuantity,
    formatPrice,
    reviewOrder,
    productListRef,
    categoryScrollRef,
    handleCategorySelect,
    handleViewableItemsChanged,
    handleScrollBeginDrag,
    handleScrollEndDrag,
    viewabilityConfig,
  } = orderScreenProps;

  const {
    animation,
    onPressButton,
    onAnimationComplete,
    handleCartIconLayout,
  } = cartAnimationProps;

  const renderSectionHeader = ({ section }: { section: SectionListData<any, ProductSection> }) => {
    if (searchQuery.trim()) {
      return null;
    }
    return <CategoryHeader title={(section as ProductSection).category} />;
  };

  const renderItem = ({ item }: { item: any }) => {
    if (!item || !item.id) {
      return null;
    }
    return (
      <OrderProductItem
        item={item}
        quantity={getQuantity(item.id)}
        onQuantityChange={onChangeQuantity}
        onButtonPress={onPressButton}
        formatPrice={formatPrice}
      />
    );
  };

  const keyExtractor = (item: any, index: number) => {
    return `product-${item.id}-${index}`;
  };

  const hasProducts = productSections.length > 0 && productSections.some(section => section.data.length > 0);
  const isSearchEmpty = searchQuery.trim() && (!hasProducts || productSections.length === 0);

  const productListPaddingBottom = BOTTOM_BAR_HEIGHT + insets.bottom + 60;


  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <OrderHeader />

      <View style={styles.contentWrapper}>
        <OrderSearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <OrderCategoryFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          scrollRef={categoryScrollRef}
        />

        {hasProducts ? (
          <SectionList<Product, ProductSection>
            ref={productListRef}
            sections={productSections}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={keyExtractor}
            style={styles.productList}
            contentContainerStyle={[
              styles.productListContent,
              { paddingBottom: productListPaddingBottom },
            ]}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onViewableItemsChanged={handleViewableItemsChanged}
            onScrollBeginDrag={handleScrollBeginDrag}
            onScrollEndDrag={handleScrollEndDrag}
            viewabilityConfig={viewabilityConfig}
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        ) : isSearchEmpty ? (
          <View style={styles.productList}>
            <EmptyState isSearch={true} />
          </View>
        ) : null}

        <OrderSummary
          totalItems={totalItems}
          cartItemCount={cartItemCount}
          cartTotal={cartTotal}
          formatPrice={formatPrice}
          onReviewOrder={reviewOrder}
          onCartIconLayout={handleCartIconLayout}
          onAnimationComplete={onAnimationComplete}
          disabled={cartItems.length === 0}
          bottomInset={insets.bottom}
        />

        {animation && (
          <CartAnimation
            key={animation.key}
            startX={animation.startX}
            startY={animation.startY}
            endX={animation.endX}
            endY={animation.endY}
            onComplete={onAnimationComplete}
          />
        )}
      </View>
    </View>
  );
};

export default OrderScreen;
