// 아이템 타입 유효성 검사
export const ValidationCheck = (targetEnum, target) => {
  const targetArray = Object.values(targetEnum);
  return targetArray.includes(target);
};
