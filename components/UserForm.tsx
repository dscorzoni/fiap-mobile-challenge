import { StyleSheet, TextInput, Alert, Text } from 'react-native'
import { Role, User } from '@/types'
import React, { useState } from 'react'
import Button from './Button'
import { createUser, updateUser } from '@/api/user/userService'
import { router } from 'expo-router'

interface Props {
  role: Role
  initialValues?: User
}

export default function UserForm({ role, initialValues }: Props) {
  const [userData, setUserData] = useState<User>()
  const isEdit = initialValues ? true : false
  const typeOfIteration = !isEdit ? userData?.role : initialValues?.role
  const roleLabel = typeOfIteration === 'teacher' ? 'Professor(a)' : 'Estudante'
  const nextRoute = typeOfIteration === 'teacher' ? '/rede/teacher-list' : '/rede/student-list'
  const handleInputChange = (name: string, value: string) => {
    setUserData({
      ...userData,
      [name]: value,
    } as User)
  }
  const handleSave = async () => {
    try {
      if (!isEdit && userData) {
        const response = await createUser({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          role: role,
        })
        if (response.success) {
          Alert.alert(`${roleLabel} criado com sucesso!`)
          router.replace(nextRoute)
        } else {
          Alert.alert(`Ocorreu um problema ao tentar criar ${roleLabel}`)
        }
      } else if (initialValues && userData) {
        const response = await updateUser(initialValues.email, userData)
        if (response.success) {
          Alert.alert(`${roleLabel} editado com sucesso!`)
          router.replace(nextRoute)
        } else {
          Alert.alert(`Ocorreu um problema ao tentar editar ${roleLabel}`)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <TextInput
        autoCapitalize='none'
        style={styles.input}
        placeholder='Nome'
        defaultValue={initialValues?.username}
        onChangeText={(text) => handleInputChange('username', text)}
      ></TextInput>
      <TextInput
        autoCapitalize='none'
        keyboardType='email-address'
        style={styles.input}
        placeholder='Email'
        defaultValue={initialValues?.email}
        onChangeText={(text) => handleInputChange('email', text)}
      ></TextInput>
      {!initialValues && (
        <TextInput
          autoCapitalize='none'
          style={styles.input}
          placeholder='Senha'
          secureTextEntry={true}
          onChangeText={(text) => handleInputChange('password', text)}
        ></TextInput>
      )}
      <Button
        title='Salvar'
        isDisabled={
          !initialValues
            ? !userData?.email || !userData?.password || !userData?.username
            : false
        }
        onPress={handleSave}
      ></Button>
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 4,
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
})
