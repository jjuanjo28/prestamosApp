import { UPDATE_USER } from "../actions/user";
import { combineReducers } from 'redux';

const user  = (user = { nombre: "",
                        apellido: "",
                        email: "",
                        id: "",
                        usuario: ""
                    }, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return { nombre: action.nombre,
                     apellido: action.apellido,
                     email: action.email,
                     id: action.id,
                     usuario: action.usuario}

        default:
            return user;
    }
}


export default combineReducers({ user });