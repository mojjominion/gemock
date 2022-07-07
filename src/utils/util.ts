/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === 'object' &&
    !Object.keys(value).length
  ) {
    return true;
  } else {
    return false;
  }
};

export type ConditionFnc<T> = (t: T) => boolean;
export const any =
  <T>(...cfns: ConditionFnc<T>[]): ConditionFnc<T> =>
  (t: T) =>
    !!cfns.find(fn => fn(t));

/**
 * Finds first function which return `false`.
 */
export const all =
  <T>(...cfns: ConditionFnc<T>[]): ConditionFnc<T> =>
  (t: T) =>
    !cfns.find(fn => !fn(t));

export const isLocale: ConditionFnc<string> = k =>
  k.length == 2 || k.includes('_') || k.includes('locale');
export const isDefs: ConditionFnc<string> = k => k.includes('definitions');
export const isUnique: ConditionFnc<string> = k => k.includes('unique');
export const isFake: ConditionFnc<string> = k => k.includes('fake');
export const isMersenne: ConditionFnc<string> = k => k === 'mersenne';
export const isForbidden = any(isLocale, isMersenne, isDefs, isUnique, isFake);
