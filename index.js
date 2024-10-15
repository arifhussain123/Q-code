import React from 'react';
import { AppRegistry, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from './App';
import { name as appName } from './app.json';
import { persistor, store } from './src/redux/store';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

PushNotification.configure({
    onRegister: function (token) {
        console.log("FCM token", token)
    },
    onNotification: function (notification) {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onRegistrationError: function (err) { },
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    senderID: '297145407836',
    requestPermissions: true,
});


PushNotification.createChannel({
    channelId: "fcm_fallback_notification_channel", // (required)
    channelName: "FCM Notification Channel", // (required)
},
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

// Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     // console.log('Message handled in the background!', remoteMessage);
// });


const RNRedux = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => RNRedux);