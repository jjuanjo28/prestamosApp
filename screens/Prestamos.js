import { View, Text, ScrollView, Image } from "react-native";

import axios from "axios";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CompPrestamo } from "../components/CompPrestamo";



// URI de Casa
let URI = "http://192.168.0.10:8100/";

// uri dos es la direccion de la bichi en la cocina
//let URI = "http://192.168.1.101:8100/"

// uri tres es la direccion de bichi en la pieza
// let URI = "http://192.168.1.36:8100/"

const USUARIO_KEY = "@user:key";
const Prestamos = () => {
  const [userLogged, setUserLogged] = useState(null);
  const [prestamos, setPrestamos] = useState([]);
 
  
  useEffect(() => {

   
  muestraStorage()
  }, []);

  useEffect(() => {
    console.log("soy userLogged aca cambie:", userLogged);
   //  console.log("soy el length de userLogged:", userLogged.length);
   //muestraStorage() 
   if(userLogged !== null){
      getPrestamos()
    }

  }, [userLogged]);

  useEffect(() => {
   //console.log("soy prestamos filtrado:", prestamos);
   if(prestamos.length ==! 0){
     muestraPrestamos();
   }
  }, [prestamos]);

  async function muestraStorage() {
    console.log("aca segundo")
        
      await AsyncStorage.getItem(USUARIO_KEY).then((response) => {
        console.log("ahora lo muestro desde Prestamos:",response)
        setUserLogged(JSON.parse(response));
      });
  
  }

  const getPrestamos = async () => {
       
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${URI}prestamos/user/${userLogged[0].id}`,
        headers: {},
      };
  
      const restponse = await axios(config);
      let filtro = restponse.data;
    // console.log("soy filtro:", filtro )
  if(userLogged !== null){
    const prestamosFiltrados = filtro.filter(
      (prestamos) => prestamos.id_user === userLogged[0].id
    );
  
   // console.log("soy filtro: ", filtro);
  
    //console.log("soy userId:", userLogged[0].id);
    //console.log("aca deberia ser filtrado:", prestamosFiltrados);
    setPrestamos(prestamosFiltrados);
  
    
        
  
      }

   
   

    
  
    
}


  let muestraPrestamos = () => {
    const baseURL = "../assets/";
    if ( prestamos !== undefined) {
      return prestamos.map((prestamo, index) => (
        <View key={index}>
          <CompPrestamo
            nombre={prestamo.nombre}
            fechaPrestamo={prestamo.fechaPrestamo}
            fechaDevolucion={prestamo.fechaDevolucion}
            telefono={prestamo.telefono}
            foto={prestamo.foto}
            devuelto={prestamo.devuelto}
            id={prestamo.id}
          />
          
        </View>
      ));
    }
  };

  return (
    <View>
     <ScrollView>{muestraPrestamos()}</ScrollView>
    </View>
  );
};
export default Prestamos;
