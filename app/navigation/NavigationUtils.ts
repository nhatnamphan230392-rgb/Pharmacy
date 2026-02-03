import {
  CommonActions,
  StackActions,
  StackActionType,
} from '@react-navigation/native';
import React from 'react';

type typeNavigation = {
  dispatch: (arg0: CommonActions.Action | StackActionType) => void;
  canGoBack: () => boolean;
} | null;

let _navigator: typeNavigation;

export function setTopLevelNavigator(navigatorRef: typeNavigation) {
  _navigator = navigatorRef;
}

export function navigate(routeName: string, params?: object | undefined) {
  _navigator?.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

export function goBack() {
  _navigator?.dispatch(CommonActions.goBack());
}

export const graphQLErrorRef = React.createRef<any>();

function pop(value: number) {
  _navigator?.dispatch(StackActions.pop(value));
}

export function reset(routeName: string, params?: object | undefined) {
  _navigator?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName, params}],
    }),
  );
}

export const NavigationUtils = {
  navigate,
  setTopLevelNavigator,
  goBack,
  pop,
  reset,
};
