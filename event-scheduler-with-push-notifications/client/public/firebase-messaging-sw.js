// Scripts for firebase and firebase messaging
importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
	apiKey: "AIzaSyDRmSuzynOynHefdtj-QpcWaWgWcrHaUJI",
	authDomain: "notificationexample-507cf.firebaseapp.com",
	projectId: "notificationexample-507cf",
	storageBucket: "notificationexample-507cf.appspot.com",
	messagingSenderId: "719122766956",
	appId: "1:719122766956:web:928d6098f2881cad084c49"
  };
  

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	console.log("Received background message ", payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
