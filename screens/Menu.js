import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react"
import Prestamos from "./Prestamos";
import NewPrestamo from "./NewPrestamo";
import LoginPro from "./LoginPro";
import { PrestamoCard } from "../components/PrestamoCard";

const Tab = createMaterialBottomTabNavigator();

const Menu = ({route}) => {
  
  const { user } = route.params
  
  const [logged, setLogged] = useState(true)


  useEffect(() => {
    console.log("soy user en menu: ", user)
    if (user != null) {
      setLogged(true);
    }
  }, [user]);

  const theme = useTheme();
  theme.colors.secondaryContainer = "#e5e5e5";

  return (
    <Tab.Navigator
      tabBarActivateBacgroundColor="#fff"
      activateColor="#000"
      inactivateColor="#95a5a6"
      barStyle={styles.navigatorBar}
    >
    {!logged ? (
   <>

   
      <Tab.Screen
        name="Login"
        component={LoginPro}
        initialParams={{ user }}
        options={{
          tabBarLabel: "Login Google",
          tabBarIcon: () => <AntDesign name="google" size={24} color="black" />,
        }}
      />
   </>
    ):(
      <>

      <Tab.Screen
        name="Login"
        component={LoginPro}
        initialParams={{ user }}
        options={{
          tabBarLabel: "Login Google",
          tabBarIcon: () => <AntDesign name="google" size={24} color="black" />,
        }}
      />

      <Tab.Screen
        name="Prestamos"
        component={Prestamos}
        options={{
          tabBarLabel: "Prestamos",
          tabBarIcon: () => <Ionicons name="list" color="#000" size={24} />,
        }}
      />
       <Tab.Screen
        name="Prestamo"
        component={NewPrestamo}
        options={{
          tabBarLabel: "Nuevo Prestamo",
          tabBarIcon: () => <Entypo name="new" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Card-Screen"
        component={PrestamoCard}
        initialParams={{ user }}

       />
      </>

    )}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigatorBar: {
    backgroundColor: "#fff",
  },

});

export default Menu;