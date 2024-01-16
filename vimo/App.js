import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { styles } from './styles/app-style'
import Navegation from './components/navegation/navegation'
import useStore from './zustand/user'
export default function App() {

  const {name} = useStore()

  return (
    <View style={styles.container}>
      <Text style={styles.textLight}>Mi balance : {name}</Text>
      <Text style={styles.textMoney}>$ 23.222,00</Text>
      <Navegation />
      <StatusBar style="auto" />
    </View>
  );
}


