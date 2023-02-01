import { StyleSheet, Text, View, Switch } from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [isFirstLaunch, setIsFirstLauch] = useState();
  
  const initFirstLaunch = async () => {
    try {
      await AsyncStorage.setItem('firstLaunch', "false");
      await AsyncStorage.setItem('appEnabled', "false");
      console.log('first')
    } catch (e) {
      console.log(e)
    }
  }
  const initLaunch = async() =>{
    try{
      const value = await AsyncStorage.getItem('appEnabled');
      console.log(value)
      console.log(typeof(value));
      if(value == "true"){
        setMSIE(true);
      }
    }
    catch(e){
      console.log(e)
    }

  }
  const checkFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem('firstLaunch');
      if(value === null) {
        setIsFirstLauch(true);
        console.log('is first launch')
      }else{
        console.log('not first')
      }
    } catch(e) {
      // error reading value
      console.log(e)
    }
  }

  useEffect(()=>{
    checkFirstLaunch();
    if(isFirstLaunch && isFirstLaunch === true){
      initFirstLaunch();
    }
    initLaunch();
  },[])


  const [mainSwitchIsEnabled,setMSIE] = useState(false);
  const toggleMS = async()=> {
    const curstate = mainSwitchIsEnabled?"false":"true";
    setMSIE(previousState=>!previousState);
    await AsyncStorage.setItem('appEnabled', curstate);

  }
  return (
    <View style={styles.mainView}>
      <View style={styles.switches}>
        <Text style={{color: 'black',fontSize: 20,}}>Enable Sms Forwarding</Text>
        <Switch value={mainSwitchIsEnabled} onChange={toggleMS} trackColor={{false: '#767577', true: '#81b0ff'}} thumbColor={mainSwitchIsEnabled?"blue":"red"}/>
      </View>
      <View style={styles.sendContactsContainer}>
        <View style={styles.sendListHeader}>
          <Text style={{fontSize: 18, color: 'black'}}>Send List</Text>

        </View>
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
  switches:{
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sendContactsContainer:{
    margin: 22,

  },
  sendListHeader: {
    backgroundColor: "grey",
    
  }
})