import faker from 'faker';

const generateFakerInstance = () => {
  const res = {};

  for (const [, val] of Object.entries(faker)) {
    if (typeof val === 'object') {
      for (const [k, v] of Object.entries(val)) {
        res[k] = v;
      }
    }
  }
  return res as FakerTypes;
};

const fakerInstance = generateFakerInstance();

export default fakerInstance;
