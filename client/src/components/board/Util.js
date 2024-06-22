// 글자 수가 90자를 넘으면 90자 까지 자르고 ...을 붙이는 함수
export function charMaxLength(content) {
  const maxLength = 90;
  return content.length > maxLength
    ? `${content.substring(0, maxLength)}...`
    : content;
}
