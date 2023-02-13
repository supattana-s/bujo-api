const port = 8000;

const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
    res.send("Hello from Express + TS (NOt Ts yet");
});

app.listen(port, () => console.log(`server listening on port: ${port}`));
