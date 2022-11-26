const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
const { Novu, PushProviderIdEnum } = require("@novu/node");
const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

const novu = new Novu("cdd15db90683fb27ac1ec6241ceb4f70");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let eventList = [];

socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	// socket.on("newSchedule", (schedule) => {
	// 	eventList.unshift(schedule);
	// 	socket.emit("sendSchedules", eventList);
	// });

	socket.on("newEvent", (event) => {
        eventList.unshift(event);
        //sends the events back to the React app
        socket.emit("sendSchedules", eventList);
    });

	// let interval = setInterval(function () {
	// 	if (eventList.length > 0) {
	// 		for (let i = 0; i < eventList.length; i++) {
	// 			if (
	// 				Number(eventList[i].hour) === new Date().getHours() &&
	// 				Number(eventList[i].minute) === new Date().getMinutes() &&
	// 				new Date().getSeconds() === 0
	// 			) {
	// 				socket.emit("notification", {
	// 					title: eventList[i].title,
	// 					hour: eventList[i].hour,
	// 					mins: eventList[i].minute,
	// 				});
	// 			}
	// 		}
	// 	}
	// }, 1000);

	socket.on("disconnect", () => {
		socket.disconnect();
	});
});

app.get("/api", async (req, res) => {
	const subscriberId = "63827e7a15685362a3112dc9";
	await novu.subscribers.identify(subscriberId, {
		firstName: "YOUR_FIRST_NAME",
		lastName: "YOUR_LAST_NAME",
	});

	await novu.subscribers.setCredentials(subscriberId, PushProviderIdEnum.FCM, {
		deviceTokens: ["BIN9lks18zEjvgx3pls5MYguEfRefTxPLBFSEaAXkH5zPZMrtIinuWmXJ4lW2AuTba2RY6wxHDKjBYXexE_yhig"],
	});

	const trigger = await novu.trigger("TEMPLATE_ID", {
		to: {
			subscriberId,
		},
	});

	res.json(trigger.data);
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
