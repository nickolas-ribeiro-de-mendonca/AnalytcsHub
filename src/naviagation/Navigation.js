import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Companies from '../screens/Companies';
import Situation from '../screens/Situation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import commonStyles from '../commonStyles';
import SituationApt from '../screens/SituationApt';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Login from '../screens/Login';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const MyTabs = () => {
	return (
		<Tab.Navigator
			style={{backgroundColor: commonStyles.colors.cor1}}
			tabBarPosition="bottom"
			initialRouteName="Apontamentos"
			screenOptions={({route}) => ({
				tabBarStyle: {
					backgroundColor: commonStyles.colors.cor2,
					height: 65,
					borderTopRightRadius: 15,
					borderTopLeftRadius: 15,
				},
				tabBarLabelStyle: {fontSize: 15},
				tabBarActiveTintColor: commonStyles.colors.white,
				tabBarInactiveTintColor: commonStyles.colors.lightGray,
				tabBarIcon: ({focused, color}) => {
					let iconName;

					if (route.name === 'Empresas') {
						iconName = 'building';
					} else if (route.name === 'Apt Func') {
						iconName = 'user-alt';
					} else if (route.name === 'Apt Emp') {
						iconName = 'users';
					}
					return (
						<FontAwesome5
							name={iconName}
							size={20}
							color={
								focused
									? (color = commonStyles.colors.white)
									: (color = commonStyles.colors.lightGray)
							}
						/>
					);
				},
			})}>
			<Tab.Screen name="Empresas" component={Companies} />
			<Tab.Screen name="Apt Emp" component={SituationApt} />
			<Tab.Screen name="Apt Func" component={Situation} />
		</Tab.Navigator>
	);
};

const AuthNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name="Login">
				{props => <Login {...props} navigation={props.navigation} />}
			</Stack.Screen>
			<Stack.Screen name="Home" >
				{props => <MyTabs {...props} navigation={props.navigation} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

const Navigator = () => {
	return (
		<NavigationContainer>
			<AuthNavigator />
		</NavigationContainer>
	);
};

export {MyTabs, Navigator};
