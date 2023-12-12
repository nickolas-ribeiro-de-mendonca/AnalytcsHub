import 'react-native-gesture-handler';
/**
 * @format
 */
import {AppRegistry, LogBox} from 'react-native';
//import Companies from './src/screens/Companies';
import MyTabs from './src/naviagation/Navigation';
import {name as appName} from './app.json';
LogBox.ignoreLogs(['Require cycle: node_modules/victory', 'Reanimated 2']);

AppRegistry.registerComponent(appName, () => MyTabs);
