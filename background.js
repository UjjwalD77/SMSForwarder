import BackgroundService from 'react-native-background-actions';
import SmsListener from '@ernestbies/react-native-android-sms-listener';
import DirectSms from 'react-native-direct-sms';
import {PermissionsAndroid} from 'react-native';

let  Subscription = {}
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
    Subscription = SmsListener.addListener(message => {
    console.log(message)
    try {
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            DirectSms.sendDirectSms('839288989', 'This is a direct sms');
        } else {
            console.log('SMS permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
    });
    const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
    
    // You can do anything in your task such as network requests, timers and so on,
    // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
    // React Native will go into "paused" mode (unless there are other tasks running,
    // or there is a foreground app).
    const veryIntensiveTask = async (taskDataArguments) => {
        // Example of an infinite loop task
        const { delay } = taskDataArguments;
        await new Promise( async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            console.log(i);
            await sleep(delay);
        }
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
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 1000,
    },
};

await BackgroundService.start(veryIntensiveTask, options);
await BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'}); // Only Android, iOS will ignore this call
// iOS will also run everything here in the background until .stop() is called
// await BackgroundService.stop();
}

export const StopMain = async () => {
    // Subscription.remove();
    // SmsListener.remove();
    await BackgroundService.stop();

}
