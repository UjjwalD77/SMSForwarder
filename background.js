import BackgroundService from 'react-native-background-actions';
import SmsListener from '@ernestbies/react-native-android-sms-listener';
import DirectSms from 'react-native-direct-sms';
import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


let  Subscription = {}
const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
export const BackgroundMain = async(command)=>{
    if(command == "stop"){
        Subscription.remove();
        await BackgroundService.stop();  
        return;
    }
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
            title: 'App Sms Permission',
            message:
            'App needs access to your inbox         ' +
            'so you can send messages in background.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Checked permission ✔️')
        } else {
            console.log('SMS permission denied');
        }
        
        
        if(requestReadSmsPermission()){
            Subscription = SmsListener.addListener( async (message) =>{
                console.info('got a sms ', message)
                let contactsToSend = await AsyncStorage.getItem('contactsToSend');
                contactsToSend = JSON.parse(contactsToSend);
                console.log(contactsToSend)
                for (const [key, value] of Object.entries(contactsToSend)) {
                    console.log(key)
                    const stringtosend = 'From: ' + message.originatingAddress + '\n Message: ' + message.body
                    console.log('smsto send : \n', stringtosend)
                    DirectSms.sendDirectSms(key, stringtosend);
                  }
              })
        }
        async function requestReadSmsPermission() {
            try {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_SMS,
                    );
                    
                    await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
                        );
                        return true;
                    } catch (err) {
                        console.log('permission error ', err)
                        return false;
                    }
                }
                
                const veryIntensiveTask = async (taskDataArguments) => {
                    // Example of an infinite loop task
                    const { delay } = taskDataArguments;
                    await new Promise( async (resolve) => {
                        // for (let i = 0; BackgroundService.isRunning(); i++) {
                //             console.log(i);
                //     await sleep(delay);
                // }
            });
        };
        const options = {
            taskName: 'Example',
            taskTitle: 'ExampleTask title',
            taskDesc: 'ExampleTask description',
            taskIcon: {
                name: 'ic_launcher',
                type: 'mipmap',
            },
            color: '#ff00ff',
            linkingURI: 'yourSchemeHere://chat/jane',
            parameters: {
                delay: 1000,
            },
        };
        await BackgroundService.start(veryIntensiveTask, options);
        await BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'}); // Only Android, iOS will ignore this call
        // iOS will also run everything here in the background until .stop() is called
        
    }
