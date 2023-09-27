import React from "react";
import { StyleSheet, Text, TextInput, View, Image } from "react-native"
import axios from "axios";
import { useState, useEffect } from "react";
import { ButtonOrange, ButtonBlue } from "../components/Buttons";
import { saveUser, deleteUser } from "../storage/UsuarioAsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../src/actions/user";

// uri de casa modificar
let URI = "http://192.168.0.10:8100/";

// esa es la direccion de la bichi en la cocina:
//let URI = "http://192.168.1.101:8100/"

// uri tres es la direccion de bichi en la pieza
// let URI = "http://192.168.1.36:8100/"



const LoginPro = ({route}) => {

    let dispatch = useDispatch()

      // creo grupo de useStates para poder controlar los inputs
      const [users, setUsers] = useState([]);
      const [userLogged, setUserLogged] = useState([]);
      const [logged, setLogged] = useState(false)
      const [userName, setUserName] = useState("");
      const [password, setPassword] = useState("");
      const newUser = useSelector(state => state.user)
      
      useEffect(() => {
       
        getUsers()        
        }, []);
  
      useEffect(() => {
        console.log("aca cambio userLogged", userLogged)
        if(userLogged.length !== 0){
          guardarDato()
        }
      }, [userLogged])

      const guardarDato = async () => {
        if(userLogged ==! null){
          const userJSON = JSON.stringify(userLogged[0])
          try {
            await AsyncStorage.setItem('user', userJSON);
            console.log('Dato guardado aca correctamente');
          } catch (error) {
            console.error(error);
          }
        } return
      };
 

      const getUsers = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${URI}users/`,
            headers: { }
            };

         const restponse = await axios(config)
         setUsers(restponse.data)
         
         
      }
  
  
      const handleLogin = () => {
             
        const username = userName;
        const pass = password;
    
        // verifico si existe el user en la base
     
        if (users.some((user) => user.usuario == username )) {
               
          const test = users.filter(
            // cuando existe el user y el password es igual al de la base, accedo al if
            (user) => user.usuario == username && user.password == pass );
          // si el password es igual una vez que ya tenia el dato del nombre del user.... cargo en setUser y envio a App para que funcione en general
    
          if (test.some((user) => user.password == pass)) {
           
            setUserLogged(test);
            saveUser(test)
            
          //  console.log("adentro del some:",userLogged)
            setLogged(true)  
            console.log("intento que sea el user:",test[0].nombre)
            dispatch( updateUser(test[0].nombre, test[0].apellido, test[0].email, test[0].id, test[0].usuario))
            
           
            
          } else {
            // me da el error de password incorrecto
            alert("el password ingresado no es el correcto");
          }
        } else {
          // me da el error que el user no existe y me envia a navegar al creador de usuario
          alert("El User que ingreso no Existe");
         
        }
      };

       function logOff() {
        setLogged(!logged)
        setUserLogged([])
        deleteUser()
       }

     console.log("soy new user:",newUser)
      return (

        <View style={styles.principal}>
        
        {!logged ? 
        <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Image style={styles.logo} source={require("../assets/Logo.png")} alt="No hay imagen"/>
        <Text style={styles.principal}>Loan Reamainder App</Text>
        <TextInput
            placeholder="Nombre de usuario o correo electrónico"
            onChangeText={(text) => setUserName(text)}
            value={userName}
            style={styles.input}
          />
          <TextInput
            placeholder="Contraseña"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            style={styles.input}
          />
          <ButtonOrange text={"iniciar sesíon"} onPress={handleLogin}/>
         
         </View>
          
          : 
          <View style={styles.container}>
           <Text> Bienvenido usuario :</Text>
           <Text>aca deberia estar el nombre:{newUser.nombre}</Text>
          <Text>{newUser.usuario}</Text>
          <Text>Ya puedes hacer uso de la Aplicacion</Text>
          <ButtonBlue text={"LogOff"} onPress={logOff}/>

           
        </View>
        }
        </View>
      );
    };
    
const styles = StyleSheet.create({
 
  logo:{
    width:220,
    height:220,
    alignItems:"center",
  },
  principal:{
    alignItems:"center",
    fontWeight:"bold",
    backgroundColor:"#000",
    padding:20
  },
  container: {
    marginTop:"15%",
    borderRadius: 10,
    width:"75%",
    height:"85%",
    backgroundColor: "#fff",
    alignItems:"center"
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    margin: 10,
    color: '#20232a',
    
  },
});
export default LoginPro