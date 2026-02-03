export { store, persistor } from './store';
export type { RootState, AppDispatch } from './store';
export { useAppDispatch, useAppSelector } from './hooks';
export {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  type CartItem,
} from './slices/cartSlice';
