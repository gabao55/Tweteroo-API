import express from "express";
import cors from "cors";

const server = express();

server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

server.get("/tweets", (req, res) => {
    const lastTweets = tweets.slice(-10);
    lastTweets.forEach(tweet => {
        const userObj = users.find(user => user.username === tweet.username);
        tweet.avatar = userObj.avatar;
    });
    res.send(lastTweets);
});

server.post("/tweets", (req, res) => {
    tweets.push(req.body);

    res.send("OK");
});

server.post("/sign-up", (req, res) => {
    users.push(req.body);

    res.send("OK");
});

// server.get("/users", (req, res) => {
//     res.send(users);
// });


server.listen(5000, () => console.log("Listening to port 5000"));