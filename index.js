import app from "./app.js";

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`서버가 ${port}번 포트에서 실행 중입니다.`));

app.get("/", (req, res) => {
    res.send("Home Page");
  });