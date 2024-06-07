import app from "./app.js";
import express from "express";
import recommendRouter from "./routes/recommend.js";


const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Home Page");
  });


app.use("/recommend", recommendRouter);

app.listen(port, () => console.log(`서버가 ${port}번 포트에서 실행 중입니다.`));

