import React, { useCallback, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@redux';
import { AppNavigator } from '@navigation';
import BootSplash from "react-native-bootsplash";


function App() {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  const onNavigationReady = useCallback(() => {
  }, []);


  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
      >
        <SafeAreaProvider>
          <StatusBar barStyle={'light-content'} />
          <AppNavigator onReady={onNavigationReady} />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: 10,
  },
  errorDetails: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
