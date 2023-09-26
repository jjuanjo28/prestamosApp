import {
  Text,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  Pressable,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ButtonBlue, ButtonRed } from "../components/Buttons"
import * as ImagePicker from "expo-image-picker";
import * as Contacts from "expo-contacts";
import DateTimePicker from '@react-native-community/datetimepicker';
import Prestamo from "../components/Prestamo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const USUARIO_KEY = "@user:key";

// URI de Casa
let URI = "http://192.168.0.10:8100/prestamos/";

// uri dos es la direccion de la bichi en la cocina
//let URI = "http://192.168.1.101:8100/"

// uri tres es la direccion de bichi en la pieza
// let URI = "http://192.168.1.36:8100/"

const NewPrestamo = () => {
  const [userLogged, setUserLogged] = useState([]);
  const [prestamos, setPrestamos] = useState([])
  const [image, setImage] = useState("https://via.placeholder.com/200");
  const [contacts, setContacts] = useState(undefined);
  const [selectedName, setSelectedName] = useState(null); // Estado para almacenar el nombre selecciona
  const [fechaInicial, setFechaInicial] = useState(new Date())
  const [fechaInicialString, setFechaInicialString] = useState("")
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [hayFoto, setHayFoto] = useState(false)
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState(new Date())
  const [dateString, setDateString] = useState("")
  const [dateText, setDateText] = useState("tu fecha de reclamo")
  const [showPickerDate, setShowPickerDate] = useState(false)
  const [data, setData] = useState(null)
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.ID,
            Contacts.Fields.Name,
            Contacts.Fields.PhoneNumbers,
          ],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
    muestraStorage();

  }, []);//  carga la base de usuarios que tiene la agenda del equipo
  useEffect(() => {
    console.log("aca estoy cambiado: ",prestamos); // Observa los cambios en el estado prestamos
  }, [prestamos]); 
  useEffect(() => {
  console.log("aca esta la fecha inicial:",fechaInicial)
  const year = fechaInicial.getFullYear();
  const month = String(fechaInicial.getMonth() + 1).padStart(2, '0');
  const day = String(fechaInicial.getDate()).padStart(2, '0');
  const formattedFechaInicial = `${year}-${month}-${day}`;
  setFechaInicialString(formattedFechaInicial)
  
  }, [fechaInicial])
  useEffect(() => {
    console.log("aca esta la fecha inicial:",date)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  setDateString(formattedDate)
  
  
  }, [date])
  useEffect(() => {
  console.log("cambio el userLogged en el nuevo prestamo")
  }, [userLogged])
  
  const toogleDatepicker = () => {
    setShowPickerDate(!showPickerDate);
   }

   async function muestraStorage() {
    await AsyncStorage.getItem(USUARIO_KEY).then((response) => {
      setUserLogged(JSON.parse(response));
    });
  }

  const onChage = ({type}, selectedDate) => {
            if(type == "set"){
              const currenDate = selectedDate || date
              setDate(currenDate)
              toogleDatepicker()
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const formattedFechaInicial = `${year}-${month}-${day}`;
              setDateString(formattedFechaInicial)
              setDateText(formattedFechaInicial)
              
            } 
  } 
  
  const tomarFotografia = async () => {

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,

      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    setHayFoto(true)
    } else {
      alert("no elegiste ninguna fotografia")
    }
  };


  function telefono(contact) {

    if(image == "https://via.placeholder.com/200" ){
     alert("primero debes tomar una foto")
     setSelectedName(null)
     return;
    }

    const currentDate = new Date();// Obtenemos la hora actual aquí
    
    setFechaInicial(currentDate);

    if (contact.phoneNumbers[0].number !== undefined) {
      setSelectedName(contact.name)
      setPhone(contact.phoneNumbers[0].number)
      
      let horaString = fechaInicial.getFullYear() +"-"+ fechaInicial.getMonth() + "-" +fechaInicial.getDate()
      let dateString = date.getFullYear() +"-"+date.getMonth() + "-" + date.getDate()
     
      let prest = new Prestamo(contact.name,  horaString,  dateString,   contact.phoneNumbers[0].number, image)
      
      setPrestamos([...prestamos, prest])
      console.log("soy prest",prest)
     
    } else {
      console.log(
        "el usuario " + contact.name + " no tiene telefono registrado"
      );
    }

  }

const confirmoPrestamo = async () => {
    
 

  let data = JSON.stringify({
    id_user: userLogged[0].id,
    nombre: prestamos[0].user,
    fechaPrestamo: fechaInicialString,
    fechaDevolucion: dateString,
    telefono: prestamos[0].telefono,
    foto: prestamos[0].foto,
    devuelto: 0
  });
  setData(data)
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `http://192.168.0.10:8100/prestamos/${userLogged[0].id_user}`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
 
  console.log(data)
  console.log("soy user Logged:",userLogged)
  setData(null)
  clear()

}

  let getContactRows = () => {
    if (contacts !== undefined) {
      return contacts.map((contact, index) => (
        <ButtonBlue
          key={index}
          text={contact.name}
          onPress={() => {
            telefono(contact);
            setSelectedContactId(contact.id)
          }}
        />
      ));
    }
  };

  function clear() {
    console.log("soy data en clear:",data)
      setImage("https://via.placeholder.com/200")
      setContacts(undefined)
      setSelectedName(null)
      setPhone("")
      setDateText("tu fecha de reclamo")
    
   

  } 
  return (
    
      <View style={styles.getStartedContainer}>

      
<Text style={{...styles.prestamo}}>Nuevo Prestamo</Text>

{/* <ButtonRed text="Seleccionar una Imagen" onPress={pickImage} /> */}

<Image
  style={{
    alignSelf: "center",
    height: 200,
    width: 200,
  }}
  source={{ uri: image }}
/>

{!hayFoto && (<ButtonRed text="Tomar Fotografia" onPress={tomarFotografia} />)}

 <View>

   {!showPickerDate && (
     <View>
     <Pressable
   onPress={toogleDatepicker}>
 
   <TextInput
     style={{...styles.input}}
     placeholder="tu fecha para reclamo"
     value={dateText}
     placeholderTextColor="#11182744"
     editable={false}
     />
  
   </Pressable>
   </View>
   )}

  {showPickerDate && (
    <View>
  <Text style={{...styles.fechaEntrega}}></Text>
  <DateTimePicker
  mode="date"
  display="spinner"
  onChange={onChage}
  value={date}
  />
    </View>
  )}


 </View>

{/* Mostrar el nombre seleccionado en lugar de los botones */}
{selectedName ? 
<ButtonBlue text={contacts.find((contact) => contact.id === selectedContactId).name} />
               
 : 
 
   <ScrollView>{getContactRows()}</ScrollView>

   
   
   
   
  }
  <ButtonBlue text={"Confirmo prestamo"} onPress={confirmoPrestamo} />

<StatusBar style="auto" />



      </View>
      
    
  );
};
const styles = StyleSheet.create({
  getStartedContainer: {
    width: "80%",
    alignItems: 'center',
    marginHorizontal: 50,
    backgroundColor:"#fff"
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
    prestamo:{
   
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
    textAlign:"center",
     padding: 15
    
 },
 fechaEntrega:{
    fontSize: 15,
    textAlign:"center",
    margin: 20
 },
 input:{
   fontWeight:"bold",
   fontSize: 12,
   textAlign: "center",
   margin: 30,
   padding: 20,
   backgroundColor: "orange"
 }
 
});
export default NewPrestamo;
