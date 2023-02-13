import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button, FlatList } from 'react-native';

export default function App() {

const [userInput, setUserInput] = useState('');

const userData = {
  messages: [
    {text: 'first user input'},
    {text: 'next used input'}
  ]
}

const addMessage = () => { 
  userData.messages.push({text: userInput});
  setUserInput(''); 
  console.log(userData.messages)
}


 const renderItem = ({item}) => (
 <View>
    <Text>{item.text}</Text>
  </View>
)

  


const storeData = async () => {
  try {
    const jsonValue = JSON.stringify(userInput)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
  } catch (e) {
    // saving error
  }
}


const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

  return (
   <SafeAreaView>
      <Text>display something </Text>
      <TextInput
      style={styles.input}
      onChangeText={setUserInput}
      value={userInput} />

      <Button
      title='Submit'
      onPress={addMessage}
      />
     <FlatList
  data={userData.messages}
  renderItem={renderItem}
  keyExtractor={(item, index) => index }
  />
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
