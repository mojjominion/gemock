import faker from 'faker';

const generateFakerInstance = () => {
  const res = {};

  for (const [key, val] of Object.entries(faker)) {
    if (typeof val === 'object') {
      for (const [k, v] of Object.entries(val)) {
        res[k] = v;
      }
    }
  }
  return res as FakerTypes;
};

export const fakerInstance = generateFakerInstance();
// Types
export type FakerTypes = Flatten<FakerStatic>;
type FakerStatic = typeof faker;
type ValuesOf<T> = T[keyof T];
type ObjectValuesOf<T> = Exclude<Extract<ValuesOf<T>, object>, Array<any>>;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type Flatten<T> = Pick<T, NonObjectKeysOf<T>> & UnionToIntersection<ObjectValuesOf<T>>;

type NonObjectKeysOf<T> = {
  [K in keyof T]: T[K] extends Array<any> ? K : T[K] extends object ? never : K;
}[keyof T];
