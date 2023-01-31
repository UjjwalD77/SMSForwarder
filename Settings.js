import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from 'react-native-reanimated'

const Settings = () => {
  return (
    <View>
      <View style={styles.mainView}>
        <Text style={styles.title}>App Settings</Text>
        <View style={styles.permissionsView}>
          <Text style={styles.innerTitle}> Permissions </Text>
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
  }

})