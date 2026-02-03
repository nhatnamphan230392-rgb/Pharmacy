import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { scaleWidth } from '@utils';

interface CartAnimationProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  onComplete: () => void;
}

// Kích thước và bán kính của dot animation
const DOT_SIZE = scaleWidth(16);
const DOT_RADIUS = scaleWidth(8);


export const CartAnimation: React.FC<CartAnimationProps> = ({
  startX,
  startY,
  endX,
  endY,
  onComplete,
}) => {
  // Shared values cho animation progress, opacity và scale
  const progress = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Animation progress từ 0 đến 1 trong 800ms với easing quadratic
    progress.value = withTiming(
      1,
      {
        duration: 800,
        easing: Easing.out(Easing.quad),
      },
      () => {
        // Gọi callback khi animation hoàn thành
        runOnJS(onComplete)();
      }
    );

    // Fade out dot trong quá trình animation
    opacity.value = withTiming(0, { duration: 800 });
    // Scale down dot để tạo hiệu ứng biến mất
    scale.value = withTiming(0.3, { duration: 800 });
  }, []);

  // Animated style tính toán vị trí dot trong mỗi frame
  const animatedStyle = useAnimatedStyle(() => {
    // Tính toán khoảng cách di chuyển theo trục X và Y
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    
    // Tính chiều cao đỉnh của đường cong parabolic
    const peakHeight = Math.abs(deltaY) * 0.3 + Math.abs(deltaX) * 0.15;
    
    // Progress từ 0 đến 1
    const t = progress.value;
    
    // Vị trí X hiện tại: di chuyển tuyến tính từ startX đến endX
    const currentX = startX + deltaX * t;
    
    // Tạo đường cong có đỉnh ở giữa quãng đường
    const parabolicY = startY + deltaY * t - 4 * peakHeight * t * (1 - t);
    
    return {
      position: 'absolute',
      left: currentX - DOT_RADIUS,
      // Điều chỉnh vị trí Y với offset -120 để căn chỉnh với cart icon
      top: parabolicY - DOT_RADIUS - 120,
      transform: [
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[styles.dot, animatedStyle]}
      pointerEvents="none"
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_RADIUS,
    backgroundColor: '#15529A',
    zIndex: 9999,
    shadowColor: '#15529A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});
