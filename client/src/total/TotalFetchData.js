import { useContext, useEffect } from "react";
import TotalContext from "./TotalContext";

// Dummy Data, 백엔드 완성되면 axios로 받아오고, 페이지네이션, 정렬 기능 추가해야 함
const data = [
  {
    regeion: { gu: "강남구", dong: "역삼동" },
    education: { academyCount: "24.24842", libraryCount: "5.48843" },
    environment: { parkRate: "24.583343" },
    safety: { crimeRate: "6.378483" },
    welfare: { cultureCount: "58.39523", medicalCount: "52.352523" },
    housing: {
      jeonseDeposit: "20032.523983",
      monthDeposit: "10020.526112",
      monthRent: "129.525252",
    },
    population: { youthRate: "16.48483" },
    transportation: { busStation: "23.28282" },
    convenience: { supermarket: "2" },
  },
  {
    regeion: { gu: "중구", dong: "장충동2가" },
    education: { academyCount: "12.24842", libraryCount: "3.48843" },
    environment: { parkRate: "36.583343" },
    safety: { crimeRate: "10.378483" },
    welfare: { cultureCount: "76.39523", medicalCount: "21.352523" },
    housing: {
      jeonseDeposit: "10040.523983",
      monthDeposit: "8092.526112",
      monthRent: "75.525252",
    },
    population: { youthRate: "10.48483" },
    transportation: { busStation: "19.28282" },
    convenience: { supermarket: "1" },
  },
  {
    regeion: { gu: "중구", dong: "신당동" },
    education: { academyCount: "10.5852", libraryCount: "1.48843" },
    environment: { parkRate: "21.583343" },
    safety: { crimeRate: "7.378483" },
    welfare: { cultureCount: "55.39523", medicalCount: "17.352523" },
    housing: {
      jeonseDeposit: "9837.523983",
      monthDeposit: "6733.526112",
      monthRent: "55.525252",
    },
    population: { youthRate: "9.48483" },
    transportation: { busStation: "15.28282" },
    convenience: { supermarket: "2" },
  },
  {
    regeion: { gu: "양천구", dong: "목동" },
    education: { academyCount: "95.5852", libraryCount: "8.48843" },
    environment: { parkRate: "15.583343" },
    safety: { crimeRate: "6.378483" },
    welfare: { cultureCount: "42.39523", medicalCount: "23.352523" },
    housing: {
      jeonseDeposit: "18002.523983",
      monthDeposit: "12843.526112",
      monthRent: "95.525252",
    },
    population: { youthRate: "12.48483" },
    transportation: { busStation: "20.28282" },
    convenience: { supermarket: "4" },
  },
  {
    regeion: { gu: "양천구", dong: "신정동" },
    education: { academyCount: "80.5852", libraryCount: "6.48843" },
    environment: { parkRate: "20.583343" },
    safety: { crimeRate: "5.378483" },
    welfare: { cultureCount: "40.39523", medicalCount: "20.352523" },
    housing: {
      jeonseDeposit: "15002.523983",
      monthDeposit: "10843.526112",
      monthRent: "75.525252",
    },
    population: { youthRate: "10.48483" },
    transportation: { busStation: "16.28282" },
    convenience: { supermarket: "1" },
  },
  {
    regeion: { gu: "강남구", dong: "개포동" },
    education: { academyCount: "17.24842", libraryCount: "4.48843" },
    environment: { parkRate: "20.583343" },
    safety: { crimeRate: "8.378483" },
    welfare: { cultureCount: "35.39523", medicalCount: "28.352523" },
    housing: {
      jeonseDeposit: "17000.523983",
      monthDeposit: "9123.526112",
      monthRent: "101.525252",
    },
    population: { youthRate: "14.48483" },
    transportation: { busStation: "17.28282" },
    convenience: { supermarket: "1" },
  },
];

// 처음 받아온 Data를 구, 동 별로 정렬함 / 백엔드에서 정렬까지 구현해주면 코드 삭제할거임 / 백엔드 api 완성되면 axios 함수랑 같이 따로 component로 뺄 것
const sortedData = data.sort((a, b) => {
  // 구 이름이 서로 다르다면
  if (a.regeion.gu !== b.regeion.gu) {
    return a.regeion.gu > b.regeion.gu ? 1 : -1; // 구로 오름차순 정렬
    // 구 이름이 서로 같다면
  } else if (a.regeion.dong === b.regeion.dong) {
    return a.regeion.dong > b.regeion.dong ? 1 : -1; // 동으로 오름차순 정렬
  } else {
    return 0;
  }
});

function TotalAllData() {
  const { data, setData } = useContext(TotalContext); // TotalContext의 setData를 구조분해할당으로 가져옴

  useEffect(() => {
    // 만약 데이터 길이가 0이라면 전체 데이터를 랜더링함, 빈 배열은 true값을 리턴하기 때문에 길이로 판단해야 함
    if (data.length === 0) {
      setData(sortedData);
    }
  }, [data, setData]); // setData를 생략하면 missing dependency 경고가 뜸, 위에서 사용한 데이터를 의존성 배열에 안 넣어서 그렇다고 함
}

export default TotalAllData;
