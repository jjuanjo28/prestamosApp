export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_WITH_PRESTAMOS = 'UPDATE_USER_WITH_PRESTAMOS'
export const DELETE_PRESTAMO = "DELETE_PRESTAMO"
export const updateUser = (nombre, apellido, email, id, usuario) => ({
      type: UPDATE_USER,
      nombre,
      apellido,
      email,
      id,
      usuario,
      
});
export const updateUserWhithPrestamos = (userData) => ({
    type: 'UPDATE_USER_WITH_PRESTAMOS',
    payload: userData
})
export const deletePrestamo = (prestamoId) => ({
    type: "DELETE_PRESTAMO",
    payload: prestamoId
})