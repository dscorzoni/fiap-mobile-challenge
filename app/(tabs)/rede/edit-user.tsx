import { StyleSheet, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import Header from '@/components/Header'
import { Colors } from '@/constants/Colors'
import Button from '@/components/Button'
import { Role, User } from '@/types'
import UserForm from '@/components/UserForm'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/contexts/auth'
import { getUserById } from '@/api/user/userService'

export default function RedeEditUser() {
  const { role, email } = useLocalSearchParams<{
    role: Role
    email: string
  }>()
  const [user, setUser] = useState<User>()
  const auth = useAuthContext()
  const fetchUsers = async () => {
    const user = await getUserById(email)
    if (!user) {
      router.replace('/login')
    } else {
      setUser(user)
    }
  }

  useEffect(() => {
    if (auth) {
      fetchUsers()
    }
  })

  const roleLabel = user?.role === 'teacher' ? 'Professor' : 'Aluno'

  return (
    <View style={styles.container}>
      <Header name={`Editar ${roleLabel}`} />
      <UserForm role={role} initialValues={user} />
      <Button title='Voltar' onPress={() => router.back()} />
    </View>
  )
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
})
