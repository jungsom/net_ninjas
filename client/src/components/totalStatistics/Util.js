import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';

export function whitespace(data) {
  const count = data.length;
  const tag = [];
  for (let i = 0; i < 20 - count; i++) {
    tag.push(
      <tr className='whitespace'>
        <td colSpan='14'></td>
      </tr>
    );
  }
  return tag;
}

export function numberToKoreanCurreny(number) {
  const inputNumber = number < 0 ? false : number; // number가 0보다 작으면 false가 저장되고, 0 이상이면 number가 저장됨
  const unitWords = ['만원', '억']; // raw 데이터가 만원 단위이므로 만원으로 시작
  const splitUnit = 10000; // 만원, 억이 10000 단위로 나눠짐
  const splitCount = unitWords.length; // 통화 단위의 개수
  let resultArray = []; // 통화 단위가 저장될 배열
  let resultString = ''; // 최종 결과 문자열

  for (let i = 0; i < splitCount; i++) {
    let unitResult =
      (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i); // 예) 단위가 1원일 때 i=0일 때 15985의 unitResult는 5985가 되고 resultArray에 저장됨, i=1이면, 앞에서 연산한 원 단위를 버리고 억 단위 전인 만원 단위가 저장됨
    unitResult = Math.floor(unitResult); // 단위 표시를 위해 소수점을 버림
    if (unitResult > 0) {
      const unitString = unitResult
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 숫자 세 번째 자리마다 콤마(,)를 찍어주는 정규표현식
      resultArray[i] = unitString;
    }
  }

  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue; // resultArray가 없으면 연산하지 않고 넘어감
    resultString = resultArray[i] + unitWords[i] + ' ' + resultString; // 예) i=0일 때 5,985 + "원" + " " + resultString(값 없음), i=1일 때 4,928 + "만원" + "5,985원"
  }

  return resultString.trim(); // 숫자 마지막에 공백이 들어가서 공백을 제거
}

export function getSortIcon(name, sortColumn, sort) {
  if (name === sortColumn) {
    return sort === 'asc' ? <ArrowUp /> : sort === 'desc' ? <ArrowDown /> : '';
  }
}
