import { combineReducers } from "redux";

const initialState = {
    prestamos: [], // Inicialmente, el usuario no tiene préstamos
  };
  
  const prestamosReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_PRESTAMO':
        return {
          ...state,
          prestamos: [...state.prestamos, action.payload],
        };
      case 'REMOVE_PRESTAMO':
        return {
          ...state,
          prestamos: state.prestamos.filter(prestamo => prestamo.id !== action.payload),
        };
      case 'UPDATE_PRESTAMO':
        // Implementar la actualización de un préstamo si es necesario
        return state;
      case 'SET_ALL_PRESTAMOS':
        return {
          ...state,
          prestamos: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default combineReducers({ prestamosReducer });