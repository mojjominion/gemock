import faker from 'faker';
import fakerInstance from './faker.instance';

export const PreserveType = <T extends NestedConfig>(arg: T) => arg;

function isConfigType(key: NestedConfig[string]): key is NestedConfig {
  return typeof key !== 'string';
}

// generate value for a key from faker
function getFakerValue(key: NestedConfig[string]) {
  // In case prop is another object i.e Nested type
  if (isConfigType(key)) return getFakerObject(key);

  const fnc = fakerInstance[key];
  const defaultValue = faker.animal.bird();

  if (!fnc || typeof fnc !== 'function') return defaultValue;

  const getVal = fnc as () => 0;

  return getVal();
}

function getFakerObject<T extends NestedConfig>(config: T) {
  const ens = Object.entries(config);

  const result: any = ens.reduce((a, [prop, key]) => ({ ...a, [prop]: getFakerValue(key) }), {});

  return result as AnyValue<T>;
}

export async function getFakerObjects<T extends NestedConfig>(args: FakerDataArgs<T>) {
  const { config, itr = 50 } = args;

  const array = new Array(itr).fill(1);
  const result = array.map(() => getFakerObject(config));

  return result as AnyValue<T>[];
}

const config = PreserveType({
  Name: 'firstName',
  xyz: 'creditCardNumber',
  password: 'password',
  Address: {
    code: 'zipCode',
  },
  User: {
    Name: 'firstName',
    Randomw: 'cityName',
    Adress: {
      code: 'accountName',
    },
  },
});
// const data = getFakerObjects({ config, itr: 2 });

// console.log(util.inspect(data, { showHidden: false, depth: null, colors: true }));
