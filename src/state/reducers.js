import { UPDATE_USER, UPDATE_USER_WITH_PRESTAMOS, DELETE_PRESTAMO } from "../actions/user";
import { combineReducers } from "redux";

const initalUser = {
  nombre: "",
  apellido: "",
  email: "",
  id: "",
  usuario: "",
  prestamos: []
  };


const user = (user = initalUser, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        nombre: action.nombre,
        apellido: action.apellido,
        email: action.email,
        id: action.id,
        usuario: action.usuario,
      };
      case UPDATE_USER_WITH_PRESTAMOS:
        return {
            ...user,
            ...action.payload
        }

      case DELETE_PRESTAMO:
        const prestamoIdToDelete = action.payload;
        const updatedPrestamos = { ...user };
       // console.log("soy updated antes:", updatedPrestamos)
        Object.keys(updatedPrestamos).map((key)=>{
           if(typeof user[key] == "object"){          
          if(user[key].id == prestamoIdToDelete){
            console.log("soy updatePrestamo[key]:",updatedPrestamos[key])
           delete updatedPrestamos[key]
           return updatedPrestamos
        }
           }
          })
       
       // console.log("soy updated antes:", updatedPrestamos) // Creamos una copia del objeto user
       // delete updatedPrestamos[prestamoIdToDelete]; 
        //console.log("soy update despues",updatedPrestamos)// Eliminamos el préstamo usando su clave numérica
       
          

    default:
      return user;
  }
};



export default combineReducers({ user });
