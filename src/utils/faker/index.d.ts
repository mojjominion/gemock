declare type FakerStatic = typeof import('faker');

declare interface NestedConfig {
  [key: string]: keyof FakerTypes | NestedConfig;
}

declare type AnyValue<T> = {
  [K in keyof T]: T[K] extends object ? AnyValue<T[K]> : any;
};

declare type FakerDataArgs<T> = {
  config: T;
  itr: number;
};

declare type FakerTypes = Flatten<FakerStatic>;
declare type ValuesOf<T> = T[keyof T];
declare type ObjectValuesOf<T> = Exclude<
  Extract<ValuesOf<T>, object>,
  Array<any>
>;

declare type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

declare type Flatten<T> = Pick<T, NonObjectKeysOf<T>> &
  UnionToIntersection<ObjectValuesOf<T>>;

declare type NonObjectKeysOf<T> = {
  [K in keyof T]: T[K] extends Array<any> ? K : T[K] extends object ? never : K;
}[keyof T];
