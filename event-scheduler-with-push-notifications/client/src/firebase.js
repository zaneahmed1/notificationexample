import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
	apiKey: "AIzaSyDRmSuzynOynHefdtj-QpcWaWgWcrHaUJI",
	authDomain: "notificationexample-507cf.firebaseapp.com",
	projectId: "notificationexample-507cf",
	storageBucket: "notificationexample-507cf.appspot.com",
	messagingSenderId: "719122766956",
	appId: "1:719122766956:web:928d6098f2881cad084c49"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

export const getTokenFromFirebase = () => {
	return getToken(messaging, {
		vapidKey: "BIN9lks18zEjvgx3pls5MYguEfRefTxPLBFSEaAXkH5zPZMrtIinuWmXJ4lW2AuTba2RY6wxHDKjBYXexE_yhig",
	})
		.then((currentToken) => {
			if (currentToken) {
				console.log("current token for client: ", currentToken);
			} else {
				console.log(
					"No registration token available. Request permission to generate one."
				);
			}
		})
		.catch((err) => {
			console.log("An error occurred while retrieving token. ", err);
		});
};

export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			console.log(payload);
			resolve(payload);
		});
	});
