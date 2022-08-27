import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableHighlight, View } from 'react-native';
const Stack = createNativeStackNavigator();
import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from './Home'
import Content from './Content';
export default function App() {
  const [data, setData] = useState('')
  useEffect(() => {
    fetch('https://www.googleapis.com/blogger/v3/blogs/2226748005741537560/posts/3449984987059065216?key=AIzaSyBNE-CBZDcWS9UuBHp0Z0VZC3gYud4d6PM')
      .then((res) => res.json())
      .then((res) => { setData(res.content) })
      .catch((err) => console.log(err))
  }, []
  )
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" title='M.M.Events - Anakapalle' component={Home}
          options={{
            headerTitle: 'M.M.Events - Anakapalle',
            headerStyle: {
              backgroundColor: 'blue',
              textAlign: "center"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: "#fff"
            },
          }}

        />
        <Stack.Screen name="content" component={Content}
          options={({ route }) => ({
            title: route.params.title,
            headerStyle: {
              backgroundColor: 'blue',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: "#fff"
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}