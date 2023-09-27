export const UPDATE_USER = "UPDATE_USER";

export const updateUser = (nombre, apellido, email, id, usuario) => ({
      type: UPDATE_USER,
      nombre,
      apellido,
      email,
      id,
      usuario
});
