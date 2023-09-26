import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ButtonRed } from "./Buttons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export function PrestamoCard() {
  let URI = "http://192.168.0.10:8100/";

  const navigation = useNavigation();
  const PRESTAMO_KEY = "@prestamo:key";
  const [idPrestamo, setIdPrestamo] = useState("");
  const [prestamo, setPrestamo] = useState(null);

  useEffect(() => {
    muestraPrestamoId();
    getPrestamo();
  }, []);

  // Para recuperar el objeto de PrestamoStorage
  useEffect(() => {
    console.log("aca cambio el idPrestamo:", idPrestamo);
    muestraPrestamoId();
    getPrestamo();
  }, [idPrestamo]);

  useEffect(() => {
    console.log("soy prestamo en el card:", prestamo);
  }, [prestamo]);

  async function muestraPrestamoId() {
    await AsyncStorage.getItem(PRESTAMO_KEY).then((response) => {
      console.log("ahora lo muestro el prestamo desde PrestamoCard:", response);
      setIdPrestamo(response);
    });
  }

  const getPrestamo = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${URI}prestamo/${idPrestamo}`,
      headers: {},
    };

    const restponse = await axios(config);
    setPrestamo(restponse.data);
  };
  function viaja() {
    setIdPrestamo("");
    navigation.navigate("Prestamos");
  }
  const borroPrestamo = async () =>{
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${URI}prestamos/${idPrestamo}`,
      headers: {},
    };
    const restponse = await axios(config);
    console.log("soy la response:",restponse)
  }
  function borrar() {
    console.log("Borro el prestamo")
    borroPrestamo()
    navigation.navigate("Prestamos");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={viaja}>
        {prestamo !== null ? (
          <View>
            <Text>idPrestamo: {idPrestamo}</Text>
            <Text>user:{prestamo[0].nombre}</Text>
            <Text>fecha del prestamo: {prestamo[0].fechaPrestamo}</Text>
            <Text>fecha de devolucion: {prestamo[0].fechaDevolucion}</Text>
            <Text>Telefono: {prestamo[0].telefono}</Text>
           
          </View>
        ) : null}
      </TouchableOpacity>
     <ButtonRed onPress={borroPrestamo} text={"Eliminar Prestamo"} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
});
