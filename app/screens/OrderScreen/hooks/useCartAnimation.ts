import { useState, useRef } from 'react';

export interface AnimationState {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  key: number;
}

export const useCartAnimation = () => {
  const [animation, setAnimation] = useState<AnimationState | null>(null);
  const [cartIconPosition, setCartIconPosition] = useState<{ x: number; y: number } | null>(null);
  const [pendingAnimation, setPendingAnimation] = useState<{ x: number; y: number } | null>(null);
  const isAnimatingRef = useRef<boolean>(false);

  const startAnimation = (x: number, y: number) => {
    if (cartIconPosition) {
      isAnimatingRef.current = true;
      setAnimation({
        startX: x,
        startY: y,
        endX: cartIconPosition.x,
        endY: cartIconPosition.y,
        key: Date.now(),
      });
    }
  };

  const onPressButton = (x: number, y: number) => {
    if (cartIconPosition) {
      if (isAnimatingRef.current) {
        setPendingAnimation({ x, y });
      } else {
        startAnimation(x, y);
      }
    } else {
      setTimeout(() => {
        if (cartIconPosition) {
          startAnimation(x, y);
        }
      }, 100);
    }
  };

  const onAnimationComplete = () => {
    isAnimatingRef.current = false;
    setAnimation(null);

    if (pendingAnimation && cartIconPosition) {
      const nextAnimation = pendingAnimation;
      setPendingAnimation(null);
      setTimeout(() => {
        startAnimation(nextAnimation.x, nextAnimation.y);
      }, 50);
    }
  };

  const handleCartIconLayout = (x: number, y: number) => {
    setCartIconPosition({ x, y });
  };

  return {
    animation,
    onPressButton,
    onAnimationComplete,
    handleCartIconLayout,
  };
};
