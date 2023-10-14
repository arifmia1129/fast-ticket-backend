const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Partial<T> => {
  const options: Partial<T> = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      options[key] = obj[key];
    }
  }

  return options;
};

export default pick;
