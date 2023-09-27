import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from "./screens/Menu"
import React,{useState} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/state/store';

const Stack = createNativeStackNavigator()

export default function App() {
  const [user, setUser] = useState(null)
  
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
    <NavigationContainer>

     <Stack.Navigator>


       <Stack.Screen
         name = "Menu"
         component={Menu}
         initialParams={{ user }} // Pasa el usuario y la función para actualizarlo
         options={{
          title: "Mis Prestamos",
          headerTittleAlign: "center",
          
          headerStyle: {
            backgroundColor:"#fff",
          },
          headerTintColor: "#000",
          headerTitleStyle:{
            fontWeight: "bold",
           }


         }}

       />

     </Stack.Navigator>

    </NavigationContainer>

    </PersistGate>
    </Provider>

  );
}

