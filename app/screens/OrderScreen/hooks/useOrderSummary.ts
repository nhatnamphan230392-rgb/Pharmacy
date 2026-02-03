import { useRef, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import type { RefObject } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';

interface UseOrderSummaryProps {
  cartItemCount: number;
  onCartIconLayout?: (x: number, y: number) => void;
}

export const useOrderSummary = ({
  cartItemCount,
  onCartIconLayout,
}: UseOrderSummaryProps) => {
  const cartIconRef = useRef<View | null>(null) as RefObject<View | null>;
  const badgeScale = useSharedValue(1);
  const prevCartItemCountRef = useRef(cartItemCount);

  const measureCartIcon = useCallback(() => {
    if (cartIconRef.current && onCartIconLayout) {
      requestAnimationFrame(() => {
        cartIconRef.current?.measureInWindow((x, y, width, height) => {
          const centerX = x + width / 2;
          const centerY = y + height / 2;
          onCartIconLayout(centerX, centerY);
        });
      });
    }
  }, [onCartIconLayout]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      measureCartIcon();
    }, 100);
    
    const timer2 = setTimeout(() => {
      measureCartIcon();
    }, 500);
    
    const timer3 = setTimeout(() => {
      measureCartIcon();
    }, 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [measureCartIcon]);

  useEffect(() => {
    if (cartItemCount > 0) {
      const timer = setTimeout(() => {
        measureCartIcon();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [cartItemCount, measureCartIcon]);

  useEffect(() => {
    const interval = setInterval(() => {
      measureCartIcon();
    }, 2000);
    
    return () => clearInterval(interval);
  }, [measureCartIcon]);

  const triggerBounce = useCallback(() => {
    badgeScale.value = 1;
    badgeScale.value = withSequence(
      withSpring(1.15, { damping: 6, stiffness: 600 }),
      withSpring(1, { damping: 8, stiffness: 500 })
    );
  }, [badgeScale]);

  useEffect(() => {
    if (cartItemCount > prevCartItemCountRef.current && cartItemCount > 0) {
      const timer = setTimeout(() => {
        triggerBounce();
      }, 800);
      prevCartItemCountRef.current = cartItemCount;
      return () => clearTimeout(timer);
    } else if (cartItemCount !== prevCartItemCountRef.current) {
      prevCartItemCountRef.current = cartItemCount;
    }
  }, [cartItemCount, triggerBounce]);

  const badgeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: badgeScale.value }],
    };
  });

  return {
    cartIconRef,
    badgeAnimatedStyle,
    measureCartIcon,
  };
};
