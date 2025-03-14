import { NavigatorScreenParams } from '@react-navigation/native';
import { SCREENS } from '../utils/constants';

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Workout: undefined;
  Profile: undefined;
  Statistics: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Settings: undefined;
}; 