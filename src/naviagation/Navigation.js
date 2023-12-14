import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Companies from '../screens/Companies';
import Situation from '../screens/Situation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
   <NavigationContainer>
      <Tab.Navigator initialRouteName='Apontamentos'
         screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
               let iconName;
               
               if (route.name === 'Empresas') {
                 iconName = 'building';
               } else if (route.name === 'Apontamentos') {
                 iconName = 'clipboard-list';
               }
               return <FontAwesome5 name={iconName} size={20} color={'#5b88a5'} />;
            },
          })}
      >
         <Tab.Screen name="Empresas" component={Companies} options={{headerShown: false}}/>
         <Tab.Screen name="Apontamentos" component={Situation} options={{headerShown: false}}/>
      </Tab.Navigator>
   </NavigationContainer>
  );
}

export default MyTabs