import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import Header from '@/components/Header';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import Button from '@/components/Button';
import ManageUserItem from '@/components/ManageUserItem';
import { useAuthContext } from '@/contexts/auth';

const teachers = [
  {
    id: "1",
    username: "user1",
    email: "user1@mail.com"
  },
  {
    id: "2",
    username: "user2",
    email: "user1@mail.com"
  },
  {
    id: "3",
    username: "user3",
    email: "user1@mail.com"
  },
  {
    id: "4",
    username: "user4",
    email: "user1@mail.com"
  },
]

export default function RedeTeacher() {

  const auth = useAuthContext()
  if (auth.user?.role === 'student') {
    router.replace("/")
  }

  function handleDelete(userId: string | undefined) {
    if (userId) {
      Alert.alert(
        "Apagar professor(a)?",
        "Você tem certeza que deseja apagar este(a) professor(a)?",
        [
          { text: "Apagar", onPress: () => Alert.alert(`TODO: Delete user ${userId} function.`) },
          { text: "Cancelar", onPress: () => null },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header name='Professores' />
      <Button
        title='Novo(a) Professor(a)'
        onPress={() => router.push(`/rede/new-user?role=teacher`)}
        icon="person-add"
      />
      <View style={{
        maxHeight: "70%"
      }}>
        <ScrollView showsVerticalScrollIndicator={true}
          style={{
            paddingLeft: 10
            }}>
          {
          teachers.map((teacher) => {
            return (
              <ManageUserItem
                key={teacher.id}
                id={teacher.id}
                username={teacher.username}
                email={teacher.email}
                editAction={() => router.push(`/rede/edit-user?userId=${teacher.id}`)}
                deleteAction={() => handleDelete(teacher.id)}
              />
            )
          })
          }
        </ScrollView>
      </View>
      <Button title='Voltar' styleType="secondary" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
    gap: 20,
  },
});
