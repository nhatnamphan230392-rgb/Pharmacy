## How to Run the App

### Prerequisites
- Node.js 18
- React Native CLI
- iOS: Xcode and CocoaPods
- Android: Android Studio 

### Installation

1. Install dependencies:
```bash
yarn install
```

2. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

### Running the App

**iOS:**
yarn ios


**Android:**
yarn android

**Start Metro Bundler:**
```bash
yarn start
```

**Clean Build:**
```bash
# Clean both platforms
yarn clean

# Clean Android only
yarn clean:android

# Clean iOS only
yarn clean:ios
```

## State Management & Logic Organization

### Redux with Redux Persist

The app uses Redux Toolkit with Redux Persist for state management. Cart state is persisted to AsyncStorage to maintain cart items across app restarts.

**Cart Slice (`app/redux/slices/cartSlice.ts`):**
- `addItem`: Adds an item to the cart. If the item already exists, increments its quantity by 1. Otherwise, adds the item with quantity = 1. Automatically updates `itemCount` and `total`.
- `updateQuantity`: Updates the quantity of an existing cart item. If quantity becomes 0 or less, removes the item from the cart. Updates `itemCount` and `total` accordingly.
- `removeItem`: Removes an item from the cart and updates totals.
- `clearCart`: Clears all items from the cart.

### Screen Structure

Each screen follows a consistent three-file structure:

1. **`ScreenName.tsx`** - Main UI component containing layout and JSX
2. **`useProps.ts`** - Custom hook containing all business logic, state management, and handlers
3. **`styles.ts`** - All StyleSheet definitions for the screen

**Example Structure:**
```
app/screens/OrderScreen/
├── OrderScreen.tsx          # Main UI component
├── useProps.ts              # Logic hook (useOrderScreen)
├── styles.ts                # StyleSheet definitions
├── components/              # Sub-components
│   ├── OrderHeader.tsx
│   ├── OrderProductItem.tsx
│   ├── OrderSummary.tsx
│   └── index.ts
├── hooks/                   # Custom hooks
│   └── useCartAnimation.ts
└── constants/               # Constants (colors, etc.)
    └── colors.ts

## Trade-offs & Future Improvements
### Current Trade-offs

1. **Data Loading**: Product data is loaded from a static JSON file (`data.json`). For production, this should be replaced with API calls.

2. **Animation Performance**: Cart animations use `react-native-reanimated` which requires native module initialization. The animation queue system prevents overlapping animations but may feel slightly delayed with rapid interactions.

3. **State Persistence**: Only cart state is persisted. User preferences, search history, and other states are not persisted.

4. **Error Handling**: Limited error handling for edge cases like network failures or invalid data.

5. **Type Safety**: Some components use `any` types for flexibility. Could be improved with stricter TypeScript types.

### Future Improvements

1. **API Integration**: Replace static JSON with REST API or GraphQL endpoints
2. **Offline Support**: Implement offline-first architecture with local database (SQLite/Realm)
3. **User Authentication**: Add user login/registration and user-specific cart persistence
4. **Product Images**: Replace emoji placeholders with actual product images
5. **Search Enhancement**: Add filters (price range, prescription status, etc.)
6. **Order History**: Implement order history and reorder functionality
7. **Push Notifications**: Notify users about order status updates
8. **Accessibility**: Improve accessibility features (screen reader support, larger text options)
9. **Performance**: Implement virtualization for large product lists, image caching, and code splitting
10. **Testing**: Add unit tests for Redux slices and integration tests for critical user flows
11. **Internationalization**: Support multiple languages and currencies
12. **Analytics**: Add analytics tracking for user behavior and conversion metrics
