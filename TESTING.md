## Current Test Files

- `app/redux/slices/__tests__/cartSlice.test.ts` - Tests for cart Redux slice (total amount, total quantity calculations)
- `__tests__/App.test.tsx` - Basic App component rendering test


### 2. Run cartSlice tests

```bash
npm test -- cartSlice.test.ts
```

## CartSlice Test Structure

The test file `app/redux/slices/__tests__/cartSlice.test.ts` includes the following test cases:

### Test Groups:

1. **Total Amount Calculation** (6 test cases)
   - Calculate total amount when adding items
   - Calculate total amount when adding the same item multiple times
   - Calculate total amount when updating quantity
   - Calculate total amount when removing items
   - Reset total amount to 0 when clearing cart

2. **Total Quantity Calculation** (6 test cases)
   - Calculate total quantity when adding items
   - Calculate total quantity when adding the same item multiple times
   - Calculate total quantity when updating quantity
   - Remove item when quantity is set to 0
   - Calculate total quantity when removing items
   - Reset total quantity to 0 when clearing cart

3. **Combined Total Amount and Quantity** (1 test case)
   - Verify consistency of both total amount and total quantity when performing multiple operations

**Total: 13 test cases**


