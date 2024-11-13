import { StyleSheet, Text, View } from 'react-native';
import Header from '@/components/Header';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import Button from '@/components/Button';
import UserList from '@/components/UserLIst';

export default function RedeTeacher() {
  return (
    <View style={styles.container}>
      <Header name='Gerenciar Professores' />
      <Text style={styles.text}>Rede Screen - Professores</Text>
      <Button
        title='Criar Professor'
        onPress={() => router.push(`/rede/new-user?role=teacher`)}
      />
      <View style={styles.border}>
        <UserList role={'teacher'} />
      </View>
      <Button title='Voltar' onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.primary,
  },
  border: {
    borderWidth: 1,
    padding: 10,
  },
});
