// generate gmail randomly
export const generateGmail = (): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  let string = "";
  for (let i = 0; i < 10; i++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  return string + "@gmail.com";
};

export function randEnumValue<T extends object>(enumObj: T): T[keyof T] {
  const enumValues = Object.values(enumObj);
  const index = Math.floor(Math.random() * enumValues.length);
  return enumValues[index];
}
