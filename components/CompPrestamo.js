import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Semaforo } from "./Semaforo";
import { useNavigation } from "@react-navigation/native";
import { savePrestamo } from "../storage/PrestamoAsyncStorage";

export function CompPrestamo(props) {
  const navigation = useNavigation();
  const {
    nombre,
    fechaPrestamo,
    fechaDevolucion,
    telefono,
    foto,
    devuelto,
    id,
  } = props;

  function envio() {
    savePrestamo(id);
    console.log("soy el props en el componente prestamo:",props)
    navigation.navigate("Card-Screen");
  }

  return (
    <View>
      <TouchableOpacity onPress={envio}>
        <View style={styles.container}>
          <View>
            <Image
              style={styles.imagen}
              source={{ uri: foto }} // Carga la imagen desde recursos locales
            />
          </View>

          <View>
            <Text style={styles.nombre}>{nombre}</Text>
            <Text style={styles.texto}>fecha del prestamo:</Text>
            <Text style={styles.texto}>{fechaPrestamo}</Text>
            <Text style={styles.texto}>fecha de devolucion:</Text>
            <Text style={styles.texto}>{fechaDevolucion}</Text>
            <Text style={styles.texto}>Telefono: {telefono}</Text>
          </View>
          <View>
            <Semaforo devuelto={devuelto} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ebf8a4",
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  imagen: {
    margin: 15,
    height: 100,
    width: 100,
  },
  texto: {
    fontSize: 11,
  },
  nombre: {
    fontSize: 20,
  },
});
