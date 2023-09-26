import AsyncStorage from "@react-native-async-storage/async-storage"

const USUARIO_KEY = "@user:key"

async function saveUser(user) {
    try {
        await AsyncStorage.setItem(USUARIO_KEY, JSON.stringify(user))
        console.log("guarde dato en el async")
        return user
    } catch (error) {
        console.log(error)
    }
    
}

async function getUser() {
    try {
       const item = await AsyncStorage.getItem(USUARIO_KEY)
        console.log("estoy en el getUser:",JSON.parse(item))
         return await AsyncStorage.getItem(USUARIO_KEY).then((response)=> {return response})
    } catch (error) {
        console.log(error)
        return "error de sintaxis"
    }
    
}

async function deleteUser() {
    try {
      await AsyncStorage.removeItem(USUARIO_KEY)
      const item = AsyncStorage.getItem(USUARIO_KEY)  
      return (item == null?"user removido":"user no removido")
    } catch (error) {
        console.log(error)
        return "error de sintaxis"
    }
    
}

export {deleteUser, getUser, saveUser}