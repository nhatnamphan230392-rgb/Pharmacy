import 'react-native-gesture-handler/jestSetup';

// Mock react-native-worklets BEFORE react-native-reanimated
jest.mock('react-native-worklets', () => {
  const mockSynchronizable = (value) => ({
    value,
    set: jest.fn((newValue) => {
      mockSynchronizable.value = newValue;
    }),
  });
  
  return {
    WorkletsModule: {
      createRunOnJS: jest.fn((fn) => fn),
      createRunOnUI: jest.fn((fn) => fn),
    },
    createSerializable: jest.fn((value) => ({ value, set: jest.fn() })),
    createSynchronizable: jest.fn(mockSynchronizable),
    useSharedValue: jest.fn((initial) => ({ value: initial })),
    useAnimatedStyle: jest.fn((fn) => fn()),
    withTiming: jest.fn((value) => value),
    withSpring: jest.fn((value) => value),
    withSequence: jest.fn((...args) => args[0]),
    runOnJS: jest.fn((fn) => fn),
    runOnUI: jest.fn((fn) => fn),
    Easing: {
      linear: jest.fn(),
      ease: jest.fn(),
      quad: jest.fn(),
      cubic: jest.fn(),
      poly: jest.fn(),
      sin: jest.fn(),
      circle: jest.fn(),
      exp: jest.fn(),
      elastic: jest.fn(),
      back: jest.fn(),
      bounce: jest.fn(),
      bezier: jest.fn(),
      in: jest.fn(),
      out: jest.fn(),
      inOut: jest.fn(),
    },
  };
});

jest.mock('react-native-reanimated', () => {
  const RN = require('react-native');
  return {
    default: {
      View: RN.View,
      Value: jest.fn((value) => ({ value })),
      event: jest.fn(),
      add: jest.fn(),
      eq: jest.fn(),
      set: jest.fn(),
      cond: jest.fn(),
      interpolate: jest.fn(),
      Extrapolate: { EXTEND: 'extend', IDENTITY: 'identity', CLAMP: 'clamp' },
      Transition: {
        Together: 'Together',
        Sequence: 'Sequence',
      },
      Easing: {
        linear: jest.fn(),
        ease: jest.fn(),
        quad: jest.fn(),
        cubic: jest.fn(),
        poly: jest.fn(),
        sin: jest.fn(),
        circle: jest.fn(),
        exp: jest.fn(),
        elastic: jest.fn(),
        back: jest.fn(),
        bounce: jest.fn(),
        bezier: jest.fn(),
        in: jest.fn(),
        out: jest.fn(),
        inOut: jest.fn(),
      },
      call: jest.fn(),
      createAnimatedComponent: jest.fn((component) => component),
    },
    View: RN.View,
    Text: RN.Text,
    ScrollView: RN.ScrollView,
    FlatList: RN.FlatList,
    createAnimatedComponent: jest.fn((component) => component),
    useSharedValue: jest.fn((initial) => ({ value: initial })),
    useAnimatedStyle: jest.fn((fn) => fn()),
    withTiming: jest.fn((value) => value),
    withSpring: jest.fn((value) => value),
    withSequence: jest.fn((...args) => args[0]),
    withRepeat: jest.fn((value) => value),
    withDelay: jest.fn((delay, value) => value),
    runOnJS: jest.fn((fn) => fn),
    runOnUI: jest.fn((fn) => fn),
    Easing: {
      linear: jest.fn(),
      ease: jest.fn(),
      quad: jest.fn(),
      cubic: jest.fn(),
      poly: jest.fn(),
      sin: jest.fn(),
      circle: jest.fn(),
      exp: jest.fn(),
      elastic: jest.fn(),
      back: jest.fn(),
      bounce: jest.fn(),
      bezier: jest.fn(),
      in: jest.fn(),
      out: jest.fn(),
      inOut: jest.fn(),
    },
  };
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native-device-info', () => ({
  getDeviceId: jest.fn(() => Promise.resolve('mock-device-id')),
  getSystemName: jest.fn(() => Promise.resolve('iOS')),
  getSystemVersion: jest.fn(() => Promise.resolve('15.0')),
}));

jest.mock('react-native-bootsplash', () => ({
  show: jest.fn(() => Promise.resolve()),
  hide: jest.fn(() => Promise.resolve()),
  getVisibilityStatus: jest.fn(() => Promise.resolve('hidden')),
}));
