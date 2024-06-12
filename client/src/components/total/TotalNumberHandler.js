function TotalNumberHandler(data, n) {
  // const roundedData = []; // 객체 안의 동별 데이터를 하나씩 반복문을 돌림
  // for (const items of data) {
  //   // 소수점 처리를 해준 후에 저장할 빈 객체를 만들어줌
  //   const newItem = {}; // 동 데이터 안의 카테고리 값들을 반복문을 돌림, 예) education, safety,...
  //   for (const key in items) {
  //     newItem[key] = {}; // items[key]의 key 값들을 저장, 예) gu, dong
  //     const keys = Object.keys(items[key]); // items[key]의 value 값들을 저장, 예) "강남구", "신사동"
  //     const values = Object.values(items[key]); // key값들의 개수 만큼 반복문을 돌림, 예) 구, 동 두개 있으니까 두 번 반복
  //     for (let i = 0; i < keys.length; i++) {
  //       // 0번째 subKey는 gu, 1번째 subkey는 dong
  //       const subKey = keys[i]; // 0번째 value는 "강남구", 1번째 value는 "신사동"
  //       const value = values[i]; // value가 숫자인지 확인
  //       if (!isNaN(value)) {
  //         // 숫자가 아니면 parseFloat로 문자열을 숫자로 변환함, 정수일 경우 parseFloat(10)은 그대로 10임
  //         const numValue = parseFloat(value); // 키가 Rate를 포함하고 있는 경우, 입력받은 n자리 수 까지 반올림
  //         if (subKey.includes('Rate')) {
  //           newItem[key][subKey] = numValue.toFixed(n);
  //         } else if (subKey.endsWith('Rent') || subKey.endsWith('Deposit')) {
  //           // "억" 단위와 화폐 콤마(,)를 붙여줌
  //           newItem[key][subKey] = numberToKoreanCurreny(numValue);
  //         } else {
  //           // 숫자이고 키 값이 Rate가 아닌 경우, 정수이면 정수를 반환하고
  //           if (Number.isInteger(numValue)) {
  //             newItem[key][subKey] = numValue;
  //           } else {
  //             // 실수인 경우에도 정수로 만들어줌 예) 전세 보증금, 월세 임대료
  //             newItem[key][subKey] = numValue.toFixed(0);
  //           }
  //         }
  //       } else {
  //         // 숫자가 아닌 경우에는 문자열 그대로 유지함, 예) 강남구, 신사동
  //         newItem[key][subKey] = value;
  //       }
  //     }
  //   }
  //   roundedData.push(newItem); // 동 데이터 변환이 끝나면 roundedData 객체에 넣어주는 과정을 반복
  // }
  // return roundedData;
}

// 숫자를 한국 화폐 형식으로 바꿔주는 함수
function numberToKoreanCurreny(number) {
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

export default TotalNumberHandler;
