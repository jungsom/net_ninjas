# 5팀 Net Ninjas Data 정리

## 📄 1. 데이터 종류

- (교육) 서울시 학원 수
  - [서울시 사설학원 통계](https://data.seoul.go.kr/dataList/195/S/2/datasetView.do)
- (교육) 서울시 공공도서관 수 (V)
  - [서울의 도서관 찾기](https://lib.seoul.go.kr/slibsrch/main)
- (환경) 공원 수 (V)
  - [전국도시공원정보표준데이터](https://www.data.go.kr/data/15012890/standard.do)
- (안전) 5대 범죄 발생 현황 (V)
  - [서울시 5대 범죄 발생현황 통계](https://data.seoul.go.kr/dataList/316/S/2/datasetView.do)
- (복지) 서울시 문화시설 수 (V)
  - [서울시 문화공간 정보](https://data.seoul.go.kr/dataList/OA-15487/A/1/datasetView.do)
- (복지) 서울시 의원, 약국 수 (V)
  - [서울시 의원 인허가 정보](https://data.seoul.go.kr/dataList/OA-16480/S/1/datasetView.do)
  - [서울시 약국 인허가 정보](https://data.seoul.go.kr/dataList/OA-16484/S/1/datasetView.do)
- (주거) 서울시 전월세가 (V)
  - [서울시 부동산 전월세가 정보](https://data.seoul.go.kr/dataList/OA-21276/S/1/datasetView.do)
- (인구) 청소년(19세 미만), 청년(19~34세), 고령 비율(65세 이상) (V)
  - [서울시 주민등록인구 (연령별/동별) 통계](https://data.seoul.go.kr/dataList/10727/S/2/datasetView.do)
- (교통) 서울시 버스정류장 수 (V)
  - [사물주소 DB](https://business.juso.go.kr/addrlink/attrbDBDwld/attrbDBDwldList.do?cPath=99MD&menu=%EC%82%AC%EB%AC%BC%EC%A3%BC%EC%86%8CDB#this)
- (편의) 서울시 대형마트 수 (V)
  - [서울시 대규모점포 인허가 정보](https://data.seoul.go.kr/dataList/OA-16096/S/1/datasetView.do)

* 구별로 된 자료 : (교육) 서울시 학원 수, (안전) 5대 범죄 발생 현황

## 📝 2. 데이터 분석 결과

- 환경 : 법정동별 공원 요소(공원 면적)와 인구 요소(인구 수)값을 이용해 1인 당 공원 면적 값을 계산해 내림차순 정렬했습니다. 공원은 법정동별 없는 곳이 많아 인구 데이터 기준으로 병합했더니 널 값이 많습니다. 선택한 동의 1인 당 공원 면적값이 널 값이면 공원이 없다라는 지표가 됩니다.

- 안전: 자치구별 5대 범죄(살인, 강도, 강간, 절도, 폭력)요소(총 범죄 발생 수)와 인구 요소(인구 수)값을 이용해 1인 당 범죄 발생 수를 계산해 내림차순 정렬했습니다.

- 복지, 인구 : 법정동별로 복지 요소(복지시설 수, 병의원 및 약국 수)와 인구 요소(세대층별 인구 비율)을 계산했습니다.

- 주거 : 자치구, 법정동별로 평균 전세보증금, 평균 월세 보증금, 평균 월세 임대료를 계산했습니다.

- 교육 : 법정동별로 공공도서관 수를 계산했습니다.

- 교통 : 법정동별로 버스 정류장 수를 계산했습니다.

- 편의 : 법정동별로 대형마트 수를 계산했습니다.
