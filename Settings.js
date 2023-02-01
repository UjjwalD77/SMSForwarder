import { StyleSheet, Text, View, PermissionsAndroid, Button, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from 'react-native-reanimated'


const Settings = () => {
  const [hasPermission, setHasPermissions] = useState("unknown");
  const requestSmsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        (PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,PermissionsAndroid.PERMISSIONS.SEND_SMS), {
          title: 'SMS permission required',
          message:
            'SMSForwarder needs SMS permission to read and send the SMS',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('SMS PERMISSION GRANTED');
        setHasPermissions("true")
      } else {
        console.log('SMS PERMISSION DENIED');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const CheckPerm = async() => {
    try{
      const checked = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS &&
        PermissionsAndroid.PERMISSIONS.SEND_SMS)
        if(checked == true){
          setHasPermissions("true")
        }
        else{
          setHasPermissions("false")
          ToastAndroid.show("Missing permissions. Please Grant Permissions",3);

        }
        console.log(hasPermission)
      }
    catch(e){
        console.log(e)
      }
  }
  // useEffect(() => {
  //   PermDisplay()
  //     },[hasPermission])
const PermDisplay = () =>{
  console.log(hasPermission)
  if(hasPermission == "true"){
    return(
      <Text style={{color:'green', fontSize: 20,}}>Granted</Text>
    )
  }
  else if(hasPermission === "unknown"){
    return(
      <Button title="Check permissions" onPress={CheckPerm} />
    )
  }
  else {
    return(
      <Button title="Grant permissions" onPress={requestSmsPermission} /> 
    )
  }
}

  return (
    <View>
      <View style={styles.mainView}>
        <Text style={styles.title}>App Settings</Text>
        <View style={styles.permissionsView}>
          <View style={styles.permissionsListView} >
            <Text style={styles.innerTitle}> Permissions </Text>
            <View style={styles.individualPermissionView}>
              <Text style={styles.individualPermissionViewName}>SMS Permission</Text>
              <PermDisplay />
            </View>
          </View>
        </View>
      </View>
    </View>
  )

  

  
}

export default Settings

const styles = StyleSheet.create({
  title:{
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold'
  },
  mainView: {
    paddingLeft: 15,
    backgroundColor: 'white',
  },
  innerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: 'black',
  },
  individualPermissionView:{
    backgroundColor: 'lightgrey',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  individualPermissionViewName:{
    fontSize: 19,
    color: 'black',
  }

})