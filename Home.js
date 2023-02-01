import { StyleSheet, Text, View, Switch, ScrollView, Button, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectContactPhone } from 'react-native-select-contact';

const Home = () => {
  const [isFirstLaunch, setIsFirstLauch] = useState();  

  const initFirstLaunch = async () => {
    try {
      await AsyncStorage.setItem('firstLaunch', "false");
      await AsyncStorage.setItem('appEnabled', "false");
      await AsyncStorage.setItem('contactsToSend','none' );
      console.log('first')
    } catch (e) {
      console.log(e)
    }
  }
  const initLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem('appEnabled');
      console.log(value)
      console.log(typeof (value));
      if (value == "true") {
        setMSIE(true);
      }
    }
    catch (e) {
      console.log(e)
    }

  }
  const checkFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem('firstLaunch');
      if (value === null) {
        setIsFirstLauch(true);
        console.log('is first launch')
      } else {
        console.log('not first')
      }
    } catch (e) {
      // error reading value
      console.log(e)
    }
  }

  useEffect(() => {
    checkFirstLaunch();
    if (isFirstLaunch && isFirstLaunch === true) {
      initFirstLaunch();
    }
    initLaunch();
  }, [])

  async function addContact() {
    // on android we need to explicitly request for contacts permission and make sure it's granted
    // before calling API methods
    if (Platform.OS === 'android') {
      const request = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      // denied permission
      if (request === PermissionsAndroid.RESULTS.DENIED) throw Error("Permission Denied");
      // user chose 'deny, don't ask again'
      else if (request === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) throw Error("Permission Denied");
    }
    // Here we are sure permission is granted for android or that platform is not android
    const selection = await selectContactPhone();
    if (!selection) {
        return null;
    }
    let { contact, selectedPhone } = selection;
    console.log(`Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`);
  }    
  
  const getContactsList = async() =>{

  }
  const ContactsList = () =>{
    // const savedList = await AsyncStorage.getItem('contactsToSend');
    const savedList = "none";
    if(savedList === "none"){
      return(
        <Text style={{fontSize: 23, color: 'black', alignSelf: 'center', padding: 20}}>No Contacts Selected!</Text>
      )
    }
  }

  const [mainSwitchIsEnabled, setMSIE] = useState(false);
  const toggleMS = async () => {
    const curstate = mainSwitchIsEnabled ? "false" : "true";
    setMSIE(previousState => !previousState);
    await AsyncStorage.setItem('appEnabled', curstate);

  }

  return (
    <View style={styles.mainView}>
      <View style={styles.switches}>
        <Text style={{ color: 'black', fontSize: 20, }}>Enable Sms Forwarding</Text>
        <Switch value={mainSwitchIsEnabled} onChange={toggleMS} trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={mainSwitchIsEnabled ? "blue" : "red"} />
      </View>
      <View style={styles.sendContactsContainer}>
        <View style={styles.sendListHeader}>
          <Text style={{ fontSize: 18, color: 'black', alignSelf: 'center' }}>Send List</Text>
          <Button title='Add Contact' onPress={addContact} ></Button>
        </View>
        <ScrollView style={styles.listView}>
         <ContactsList/>

        </ScrollView>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
  switches: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sendContactsContainer: {
    margin: 22,

  },
  sendListHeader: {
    backgroundColor: "#e1f4fa",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listView:{
    maxHeight: 400,
    backgroundColor: 'lightgrey',
  }
})