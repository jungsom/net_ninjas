
# Backend

### api 명세서

https://docs.google.com/spreadsheets/d/1ZXku33nBsywga_j22DZJTNxlRun2wg8CzT1E3umS16g/edit#gid=0

### DB 구조

https://dbdiagram.io/d/66623c139713410b05f881d0

### 서버 시작하기
1. client 폴더에서 수정사항이 있다면 npm run build를 합니다. 시간이 좀 걸립니다.
```
PS D:\MyProject\net_ninjas\client> npm run build

> my-app@0.1.0 build
> react-scripts build

```
2. 빌드가 완료되면 server 에서 node index.js 를 합니다.
```
PS D:\MyProject\net_ninjas\server> node index.js
서버가 3000번 포트에서 실행 중입니다.
MongoDB Connected
```
만약 몽고db 연결에 문제가 있다면 https://www.notion.so/elice-track/MongoDB-8304d8095d4a412d9b390ea59a1e7849 를 참고해 로컬환경에서 몽고db설치를 일단 해주세요. (아틀라스 사용으로 변경할듯?)

3. http://localhost:3000/ 으로 이동해서 페이지가 잘 뜨는지 확인합니다.
4. 잘 뜨면 성공!
