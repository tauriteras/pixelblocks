import express from "express";
import path from "path";
import http from "http";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

import { Server } from "socket.io";
import { generateWorld } from "./WorldGenerator.js";

const port = 3069;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3069"],
  },
});
const indexPath = path.join(process.cwd(), "dist", "index.html");

const firebaseConfig = {
  apiKey: "AIzaSyA5rD3avhBvgg39jZDD2w1iL7AEzeC4sT4",
  authDomain: "uus-realtime-db.firebaseapp.com",
  projectId: "uus-realtime-db",
  storageBucket: "uus-realtime-db.appspot.com",
  messagingSenderId: "580851607836",
  appId: "1:580851607836:web:5ac054f0f3e9e3d3c4f2d9",
  measurementId: "G-F10P34N057",
  databaseURL: "https://uus-realtime-db-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile(indexPath);

  req.on("error", (err) => {
    console.error(err);
    res.statusCode = 400;
    res.end();
  });
});

app.use("/static", express.static("public"));

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

io.on("connection", (socket) => {
  console.log("connection", socket.id);

  socket.on("request-world", (worldname) => {
    console.log("request-world", worldname);
    onValue(ref(database, "worlds/" + worldname + "/data"), (snapshot) => {
      if (snapshot.exists()) {
        let worldData = snapshot.val();
        set(ref(database, "players/" + socket.id), {
          position: worldData.entry,
          lastPunch: 0,
        });
        socket.emit("join-world", snapshot.val());
      } else {
        let world = generateWorld(100, 56);

        set(ref(database, "worlds/" + worldname), {
          world,
        });
        set(ref(database, "players/" + socket.id), {
          position: world.entry,
          lastPunch: 0,
        });

        socket.emit("join-world", world);
      }
    });
  });

  socket.on("disconnect", () => {
    set(ref(database, "players/" + socket.id), {});
  });
});
