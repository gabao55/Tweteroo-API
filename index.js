import express from "express";
import cors from "cors";

const server = express();

server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

function getAvatar(tweets) {
    tweets.forEach(tweet => {
        const userObj = users.find(user => user.username === tweet.username);
        tweet.avatar = userObj.avatar;
    })

    return tweets
}

server.get("/tweets", (req, res) => {
    const reverseTweets = tweets.slice().reverse();
    const page = Number(req.query.page);

    if (page < 1) {
        return res.status(400).send("Informe uma página válida!");
    }

    const lastTweets = reverseTweets.slice((page-1)*10, page*10);
    console.log(getAvatar(reverseTweets));

    res.send((lastTweets));
});

server.get("/tweets/:username", (req, res) => {
    const {username} = req.params;

    const userTweets = tweets.filter(tweet => tweet.username === username);

    res.send(getAvatar(userTweets));
});

server.post("/tweets", (req, res) => {
    const {tweet} = req.body;
    const {user} = req.headers;

    if (!user || !tweet) {
        res.status(400).send({error: "Todos os campos são obrigatórios!"});
        return;
    }

    tweets.push(
        {
            username: user,
            tweet,
        }
    );

    res.status(201).send({message: "OK"});
});

server.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;

    if (!username || !avatar) {
        res.status(400).send({error: "Todos os campos são obrigatórios!"});
        return;
    }

    users.push(
        {
            username,
            avatar,
        }
    );

    res.status(201).send({message: "OK"});
});


server.listen(5000, () => console.log("Listening to port 5000"));