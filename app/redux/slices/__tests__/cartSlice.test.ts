import cartReducer, { addItem, removeItem, updateQuantity, clearCart, CartItem } from '../cartSlice';

describe('Cart Slice - Total Amount and Total Quantity', () => {
  const initialState = {
    items: [],
    total: 0,
    itemCount: 0,
  };

  const mockItem1: CartItem = {
    id: 1,
    name: 'Paracetamol 500mg',
    price: 15000,
    quantity: 2,
  };

  const mockItem2: CartItem = {
    id: 2,
    name: 'Amoxicillin 500mg',
    price: 45000,
    quantity: 1,
  };

  describe('Total Amount Calculation', () => {
    it('should calculate total amount correctly when adding items', () => {
      let state = cartReducer(initialState, addItem(mockItem1));
      expect(state.total).toBe(30000);

      state = cartReducer(state, addItem(mockItem2));
      expect(state.total).toBe(75000);
    });

    it('should calculate total amount correctly when adding same item multiple times', () => {
      let state = cartReducer(initialState, addItem(mockItem1));
      expect(state.total).toBe(30000);

      state = cartReducer(state, addItem({ ...mockItem1, quantity: 1 }));
      expect(state.total).toBe(45000);
    });

    it('should calculate total amount correctly when updating quantity', () => {
      let state = cartReducer(initialState, addItem(mockItem1));
      expect(state.total).toBe(30000);

      state = cartReducer(state, updateQuantity({ id: 1, quantity: 5 }));
      expect(state.total).toBe(75000);
    });

    it('should calculate total amount correctly when removing items', () => {
      let state = cartReducer(initialState, addItem(mockItem1));
      state = cartReducer(state, addItem(mockItem2));
      expect(state.total).toBe(75000);

      state = cartReducer(state, removeItem(1));
      expect(state.total).toBe(45000);
    });

    it('should reset total amount to 0 when clearing cart', () => {
      let state = cartReducer(initialState, addItem(mockItem1));
      state = cartReducer(state, addItem(mockItem2));
      expect(state.total).toBe(75000);

      state = cartReducer(state, clearCart());
      expect(state.total).toBe(0);
    });
  });

  describe('Total Quantity Calculation', () => {
    it('should calculate total quantity correctly when adding items', () => {
      let state = cartReducer(initialState, addItem(mockItem1));
      expect(state.itemCount).toBe(2);

      state = cartReducer(state, addItem(mockItem2));
      expect(state.itemCount).toBe(3);
    });

    it('should calculate total quantity correctly when adding same item multiple times', () => {
      let state = cartReducer(initialState, addItem(mockItem1));
      expect(state.itemCount).toBe(2);

      state = cartReducer(state, addItem({ ...mockItem1, quantity: 1 }));
      expect(state.itemCount).toBe(3);
    });

    it('should calculate total quantity correctly when updating quantity', () => {
      let state = cartReducer(initialState, addItem(mockItem1));
      expect(state.itemCount).toBe(2);

      state = cartReducer(state, updateQuantity({ id: 1, quantity: 5 }));
      expect(state.itemCount).toBe(5);
    });

    it('should remove item when quantity is set to 0', () => {
      let state = cartReducer(initialState, addItem(mockItem1));
      state = cartReducer(state, addItem(mockItem2));
      expect(state.itemCount).toBe(3);

      state = cartReducer(state, updateQuantity({ id: 1, quantity: 0 }));
      expect(state.itemCount).toBe(1);
      expect(state.items.length).toBe(1);
      expect(state.items[0].id).toBe(2);
    });

    it('should calculate total quantity correctly when removing items', () => {
      let state = cartReducer(initialState, addItem(mockItem1));
      state = cartReducer(state, addItem(mockItem2));
      expect(state.itemCount).toBe(3);

      state = cartReducer(state, removeItem(1));
      expect(state.itemCount).toBe(1);
    });

    it('should reset total quantity to 0 when clearing cart', () => {
      let state = cartReducer(initialState, addItem(mockItem1));
      state = cartReducer(state, addItem(mockItem2));
      expect(state.itemCount).toBe(3);

      state = cartReducer(state, clearCart());
      expect(state.itemCount).toBe(0);
    });
  });

  describe('Combined Total Amount and Quantity', () => {
    it('should maintain correct totals when performing multiple operations', () => {
      let state = cartReducer(initialState, addItem(mockItem1));
      expect(state.total).toBe(30000);
      expect(state.itemCount).toBe(2);

      state = cartReducer(state, addItem(mockItem2));
      expect(state.total).toBe(75000);
      expect(state.itemCount).toBe(3);

      state = cartReducer(state, updateQuantity({ id: 1, quantity: 3 }));
      expect(state.total).toBe(90000);
      expect(state.itemCount).toBe(4);

      state = cartReducer(state, removeItem(2));
      expect(state.total).toBe(45000);
      expect(state.itemCount).toBe(3);
    });
  });
});
