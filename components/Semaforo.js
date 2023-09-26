
import { Text, View } from 'react-native'

export function Semaforo (props) {

 

    return (
      <View>
        {props.devuelto ? 
        <View>
          <Text>Finalizado</Text>
        </View>
        :
        <View>
          <Text>Pendiente</Text>
        </View>
        }
      </View>
    )
  }




