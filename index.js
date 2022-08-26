import express from "express";

const server = express();

server.use(express.json());

const users = [
    {
        username: "spongebob",
        avatar: "spongebob"
    },
    {
        username: "jonas",
        avatar: "jonas"
    },
];
const tweets = [
    {
        username: "spongebob",
        tweet: "I love krabby patties 1"
    },
    {
        username: "spongebob",
        tweet: "I love krabby patties 2"
    },
    {
        username: "spongebob",
        tweet: "I love krabby patties 3"
    },
    {
        username: "spongebob",
        tweet: "I love krabby patties 4"
    },
    {
        username: "spongebob",
        tweet: "I love krabby patties 5"
    },
    {
        username: "spongebob",
        tweet: "I love krabby patties 6"
    },
    {
        username: "spongebob",
        tweet: "I love krabby patties 7"
    },
    {
        username: "jonas",
        tweet: "I love krabby patties 8"
    },
    {
        username: "spongebob",
        tweet: "I love krabby patties 9"
    },
    {
        username: "spongebob",
        tweet: "I love krabby patties 10"
    },
    {
        username: "spongebob",
        tweet: "I love krabby patties 11"
    },
    {
        username: "spongebob",
        tweet: "I love krabby patties 12"
    },
];

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