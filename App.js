import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

const [userInput, setUserInput] = useState('');
const [userData, setUserData] = useState({});

useEffect(async () => {
  let permData;
  permData = await getData();
  setUserData(permData);
}, [])




const addMessage = () => { 
  userData.messages.push({text: userInput});
  setUserInput(''); 
  console.log(userData.messages);

  storeData();
}


 const renderItem = ({item}) => (
 <View>
    <Text>{item.text}</Text>
  </View>
)

  


const storeData = async () => {
  try {
    const jsonValue = JSON.stringify(userData)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
  } catch (e) {
    // saving error
    console.log(e);
  }
}


const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) { 
    // error reading value
    const seedData = {
      messages: []
    }
    const jsonValue = JSON.stringify(seedData)
    console.log(jsonValue)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
    return seedData;
  }
}

  return (
   <SafeAreaView>
      <Text>display something </Text>
      <TextInput
      editable
      multiline
      numberOfLines={3}
      maxLength={180}
      style={styles.input}
      onChangeText={setUserInput}
      value={userInput} />
  <Text> Characters Left: {180 - userInput.length}</Text>
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
    margin: 12,
    borderWidth: 1,
    padding: 10,
    height: 86,
    fontSize:16
  }
});
