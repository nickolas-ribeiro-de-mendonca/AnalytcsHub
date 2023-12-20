import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Companies from '../screens/Companies';
import Situation from '../screens/Situation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import commonStyles from '../commonStyles';
import SituationApt from '../screens/SituationApt';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
	return (
		<NavigationContainer>
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
							iconName = 'clipboard-list';
						} else if (route.name === 'Apt Emp') {
							iconName = 'clipboard';
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
				<Tab.Screen name="Empresas" component={Companies}/>
				<Tab.Screen name="Apt Emp" component={SituationApt} />
				<Tab.Screen name="Apt Func" component={Situation} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

export default MyTabs;
