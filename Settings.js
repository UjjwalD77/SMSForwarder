import { StyleSheet, Text, View, PermissionsAndroid, Button, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from 'react-native-reanimated'


const Settings = () => {
  const [hasSMSPermission, setHasSMSPermissions] = useState("unknown");
  const [hasCONTACTPermission, setHasCONTACTPermissions] = useState("unknown");
  const requestSmsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        (PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,PermissionsAndroid.PERMISSIONS.SEND_SMS), {
          title: 'SNS permission required',
          message:
            'SMSForwarder needs SMS permission to read and send the SMS',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('SMS PERMISSION GRANTED');
        setHasSMSPermissions("true")
      } else {
        console.log('SMS PERMISSION DENIED');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const CheckSMSPerm = async() => {
    try{
      const checked = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS &&
        PermissionsAndroid.PERMISSIONS.SEND_SMS)
        if(checked == true){
          setHasSMSPermissions("true")
        }
        else{
          setHasSMSPermissions("false")
          ToastAndroid.show("Missing permissions. Please Grant Permissions",3);

        }
        console.log(hasSMSPermission)
      }
    catch(e){
        console.log(e)
      }
  }
  const requestCONTACTSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
          title: 'CONTACTS permission required',
          message:
            'CONTACTSForwarder needs CONTACTS permission to read the CONTACTS',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('CONTACTS PERMISSION GRANTED');
        setHasCONTACTPermissions("true")
      } else {
        console.log('CONTACTS PERMISSION DENIED');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const CheckCONTACTPerm = async() => {
    try{
      const checked = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
        if(checked == true){
          setHasCONTACTPermissions("true")
        }
        else{
          setHasCONTACTPermissions("false")
          ToastAndroid.show("Missing permissions. Please Grant Permissions",3);

        }
        console.log(hasCONTACTPermission)
      }
    catch(e){
        console.log(e)
      }
  }
  // useEffect(() => {
  //   PermDisplay()
  //     },[hasSMSPermission])
const SMSPermDisplay = () =>{
  console.log(hasSMSPermission)
  if(hasSMSPermission == "true"){
    return(
      <Text style={{color:'green', fontSize: 20,}}>Granted</Text>
    )
  }
  else if(hasSMSPermission === "unknown"){
    return(
      <Button title="Check permissions" onPress={CheckSMSPerm} />
    )
  }
  else {
    return(
      <Button title="Grant permissions" onPress={requestSmsPermission} /> 
    )
  }
}
const CONTACTSPermDisplay = () =>{
  console.log(hasCONTACTPermission)
  if(hasCONTACTPermission == "true"){
    return(
      <Text style={{color:'green', fontSize: 20,}}>Granted</Text>
    )
  }
  else if(hasCONTACTPermission === "unknown"){
    return(
      <Button title="Check permissions" onPress={CheckCONTACTPerm} />
    )
  }
  else {
    return(
      <Button title="Grant permissions" onPress={requestCONTACTSPermission} /> 
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
              <SMSPermDisplay />
            </View>
            <View style={styles.individualPermissionView}>
              <Text style={styles.individualPermissionViewName}>Contacts Permission</Text>
              <CONTACTSPermDisplay />
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