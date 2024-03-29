import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Companies from '../screens/Empresa';
import Situation from '../screens/Colaborador';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import commonStyles from '../commonStyles';
import SituationApt from '../screens/Apontamentos';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Login from '../screens/Login';
import LoginOrApp from '../screens/LoginOrApp';
import EstatisiticaGerais from '../screens/EstatisticasGerais';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const MyTabs = props => {
	return (
		<Tab.Navigator
			style={{backgroundColor: commonStyles.colors.cor1}}
			tabBarPosition="bottom"
			initialRouteName="Empresas"
			screenOptions={({route}) => ({
				tabBarStyle: {
					backgroundColor: commonStyles.colors.cor2,
					height: 65,
					borderTopRightRadius: 15,
					borderTopLeftRadius: 15,
					alignItems:'center'
				},
				tabBarItemStyle: {width: 140},
				tabBarScrollEnabled: true,
				tabBarLabelStyle: {fontSize: 15, textTransform:'none'},
				tabBarActiveTintColor: commonStyles.colors.white,
				tabBarIcon: ({focused, color}) => {
					let iconName;

					if (route.name === 'Empresas') {
						iconName = 'building';
					} else if (route.name === 'Colaborador') {
						iconName = 'user-alt';
					} else if (route.name === 'Apontamentos') {
						iconName = 'users';
					} else if (route.name === 'Estatistica Gerais') {
						iconName = 'tractor'
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
         	<Tab.Screen name="Empresas" component={Companies}  />
			<Tab.Screen name="Apontamentos" component={SituationApt} />
			<Tab.Screen name="Colaborador" component={Situation} />
			<Tab.Screen name="Estatistica Gerais" component={EstatisiticaGerais} />
		</Tab.Navigator>
	);
};

const AuthNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name='LoginOrApp' component={LoginOrApp}/>
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
