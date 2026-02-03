import { useState, useMemo, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector, addItem, updateQuantity } from '@redux';
import { SCREEN_ROUTE } from '@navigation';
import { SectionList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

let productsData: Product[] = [];
try {
  console.log('[useProps] Loading data.json...');
  const data = require('../../../data.json');
  console.log('[useProps] Data loaded, type:', typeof data, 'isArray:', Array.isArray(data));
  productsData = Array.isArray(data) ? data : [];
  console.log('[useProps] Products count:', productsData.length);
} catch (error) {
  console.error('[useProps] Failed to load products data:', error);
  productsData = [];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  isPrescription: boolean;
}

export interface ProductSection {
  category: string;
  data: Product[];
}

export const useOrderScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const cartTotal = useAppSelector(state => state.cart.total);
  const cartItemCount = useAppSelector(state => state.cart.itemCount);
  const totalItems = useAppSelector(state => state.cart.items.length);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const debounceTimerRef = useRef<number | null>(null);
  const productListRef = useRef<SectionList<Product, ProductSection>>(null);
  const categoryScrollRef = useRef<ScrollView>(null);
  const isScrollingFromCategory = useRef<boolean>(false);
  const isUserScrolling = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim()) {
      if (selectedCategory !== 'All') {
        setSelectedCategory('All');
        if (productListRef.current) {
          productListRef.current.scrollToLocation({
            sectionIndex: 0,
            itemIndex: 0,
            animated: true,
          });
        }
      }
    }
  }, [searchQuery]);

  const categories = useMemo(() => {
    const allCategories = (productsData as Product[]).map((product) => product.category);
    const uniqueCategories: string[] = [];
    
    allCategories.forEach((category) => {
      if (!uniqueCategories.includes(category)) {
        uniqueCategories.push(category);
      }
    });
    
    return ['All', ...uniqueCategories];
  }, []);

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(productsData) || productsData.length === 0) {
      return [];
    }

    let filtered = productsData.filter(p => p && p.id && p.name);

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (debouncedSearchQuery.trim()) {
      filtered = filtered.filter(p =>
        p.name && p.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, debouncedSearchQuery]);

  const productSections = useMemo(() => {
    if (debouncedSearchQuery.trim()) {
      return filteredProducts.length > 0
        ? [{ category: 'Search Results', data: filteredProducts }]
        : [];
    }

    if (!Array.isArray(productsData) || productsData.length === 0) {
      return [];
    }

    const grouped: { [key: string]: Product[] } = {};
    
    productsData.forEach((product) => {
      if (product && product.id && product.category) {
        if (!grouped[product.category]) {
          grouped[product.category] = [];
        }
        grouped[product.category].push(product);
      }
    });

    const sections: ProductSection[] = categories
      .filter(cat => cat !== 'All')
      .map(category => ({
        category,
        data: grouped[category] || [],
      }))
      .filter(section => section.data.length > 0);

    return sections;
  }, [categories, debouncedSearchQuery, filteredProducts]);

  const getQuantity = (productId: number) => {
    const item = cartItems.find((item: { id: number | string }) => item.id === productId);
    return item?.quantity || 0;
  };

  const onChangeQuantity = (product: Product, change: number) => {
    if (!product || !product.id || typeof product.price !== 'number') {
      return;
    }

    const currentQuantity = getQuantity(product.id);
    const newQuantity = Math.max(0, Math.min(99, currentQuantity + change));

    if (newQuantity === 0) {
      dispatch(updateQuantity({ id: product.id, quantity: 0 }));
    } else if (currentQuantity === 0) {
      dispatch(addItem({
        id: product.id,
        name: product.name || '',
        price: product.price,
        quantity: 1,
      }));
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' ₫';
  };

  const reviewOrder = () => {
    navigation.navigate(SCREEN_ROUTE.CHECKOUT_SCREEN as never);
  };

  const handleCategorySelect = (category: string) => {
    if (category === selectedCategory) {
      return;
    }

    setSelectedCategory(category);
    isScrollingFromCategory.current = true;

    if (category === 'All') {
      if (productListRef.current) {
        productListRef.current.scrollToLocation({
          sectionIndex: 0,
          itemIndex: 0,
          animated: true,
        });
      }
      setTimeout(() => {
        isScrollingFromCategory.current = false;
      }, 600);
      return;
    }

    const sectionIndex = productSections.findIndex(section => section.category === category);
    if (sectionIndex !== -1 && productListRef.current) {
      productListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true,
        viewOffset: 0,
      });
      
      setTimeout(() => {
        isScrollingFromCategory.current = false;
      }, 600);
    }

    const categoryIndex = categories.indexOf(category);
    if (categoryIndex !== -1 && categoryScrollRef.current) {
      setTimeout(() => {
        if (categoryScrollRef.current) {
          categoryScrollRef.current.scrollTo({
            x: Math.max(0, (categoryIndex - 1) * 120),
            animated: true,
          });
        }
      }, 150);
    }
  };

  const handleViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (isScrollingFromCategory.current || isUserScrolling.current) {
      return;
    }

    if (viewableItems && viewableItems.length > 0) {
      const firstVisibleItem = viewableItems[0];
      if (firstVisibleItem.section) {
        const category = firstVisibleItem.section.category;
        if (category && category !== selectedCategory && category !== 'Search Results') {
          setSelectedCategory(category);
          
          const categoryIndex = categories.indexOf(category);
          if (categoryIndex !== -1 && categoryIndex !== 0 && categoryScrollRef.current) {
            setTimeout(() => {
              if (categoryScrollRef.current && !isScrollingFromCategory.current) {
                categoryScrollRef.current.scrollTo({
                  x: Math.max(0, (categoryIndex - 1) * 120),
                  animated: true,
                });
              }
            }, 100);
          }
        }
      }
    }
  }).current;

  const handleScrollBeginDrag = () => {
    isUserScrolling.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  };

  const handleScrollEndDrag = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isUserScrolling.current = false;
    }, 300);
  };

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredProducts,
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
  };
};
