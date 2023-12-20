import 'react-native-gesture-handler';
/**
 * @format
 */
import {AppRegistry, LogBox} from 'react-native';
//import Table from './src/components/Table';
import MyTabs from './src/naviagation/Navigation';
//import SituationApt from './src/screens/SituationApt';
import {name as appName} from './app.json';
LogBox.ignoreLogs(['Require cycle: node_modules/victory', 'Reanimated 2', 'Invalid prop textStyle of type array supplied to Cell']);

AppRegistry.registerComponent(appName, () => MyTabs);
