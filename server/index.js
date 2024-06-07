const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`서버가 ${port}번 포트에서 실행 중입니다.`));