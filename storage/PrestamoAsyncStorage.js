import AsyncStorage from "@react-native-async-storage/async-storage"

const PRESTAMO_KEY = "@prestamo:key"

async function savePrestamo(prestamo) {
    try {
        await AsyncStorage.setItem(PRESTAMO_KEY, JSON.stringify(prestamo))
        console.log("guarde PRESTAMO en el async")
        return user
    } catch (error) {
        console.log(error)
    }
    
}

async function getPrestamo() {
    try {
       const item = await AsyncStorage.getItem(PRESTAMO_KEY)
        console.log("estoy en el getPrestamo:",JSON.parse(item))
         return await AsyncStorage.getItem(PRESTAMO_KEY).then((response)=> {return response})
    } catch (error) {
        console.log(error)
        return "error de sintaxis"
    }
    
}

async function deletePrestamo() {
    try {
      await AsyncStorage.removeItem(PRESTAMO_KEY)
      const item = AsyncStorage.getItem(PRESTAMO_KEY)  
      return (item == null?"user removido":"prestamo no removido")
    } catch (error) {
        console.log(error)
        return "error de sintaxis"
    }
    
}

export {deletePrestamo, getPrestamo, savePrestamo}