import { Colors } from '@/constants/Colors'
import { TextInput, View, StyleSheet } from 'react-native'

interface Props {
  searchText: string
  setSearchText: (text: string) => void
  placeholder?: string
}

export default function SearchField({ searchText, setSearchText, placeholder }: Props) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
})
