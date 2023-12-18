import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Companies from '../screens/Companies';
import Situation from '../screens/Situation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import commonStyles from '../commonStyles';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
   <NavigationContainer>
      <Tab.Navigator initialRouteName='Apontamentos'
         screenOptions={({ route }) => ({
            tabBarStyle:{backgroundColor: commonStyles.colors.cor2},
            tabBarLabelStyle: {fontSize: 15},
            tabBarActiveTintColor: commonStyles.colors.cor3,
            tabBarInactiveTintColor: commonStyles.colors.cor1,
            tabBarIcon: ({ color, size }) => {
               let iconName;

               if (route.name === 'Empresas') {
                 iconName = 'building';
               } else if (route.name === 'Apt') {
                 iconName = 'clipboard-list';
               } 
               return <FontAwesome5 name={iconName} size={20} color={commonStyles.colors.cor1} />;
            },
          })}
      >
         <Tab.Screen name="Empresas" component={Companies}  options={{headerShown: false}}/>
         <Tab.Screen name="Apt" component={Situation} options={{headerShown: false}}/>
         
      </Tab.Navigator>
   </NavigationContainer>
  );
}

export default MyTabs