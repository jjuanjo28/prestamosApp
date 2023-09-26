import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from "./screens/Menu"
import React,{useState} from 'react';

const Stack = createNativeStackNavigator()

export default function App() {
  const [user, setUser] = useState(null)
  
  return (
    <NavigationContainer>

     <Stack.Navigator>


       <Stack.Screen
         name = "Menu"
         component={Menu}
         initialParams={{ user, setUser }} // Pasa el usuario y la función para actualizarlo
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

    

  );
}

