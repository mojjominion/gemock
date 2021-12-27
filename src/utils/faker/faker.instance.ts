import faker from 'faker';

// export enum Locale {
//   az = 'faker/locale/az',
//   ar = 'faker/locale/ar',
//   cz = 'faker/locale/cz',
//   de = 'faker/locale/de',
//   de_AT = 'faker/locale/de_AT',
//   de_CH = 'faker/locale/de_CH',
//   en = 'faker/locale/en',
//   en_AU = 'faker/locale/en_AU',
//   en_AU_ocker = 'faker/locale/en_AU_ocker',
//   en_BORK = 'faker/locale/en_BORK',
//   en_CA = 'faker/locale/en_CA',
//   en_GB = 'faker/locale/en_GB',
//   en_IE = 'faker/locale/en_IE',
//   en_IND = 'faker/locale/en_IND',
//   en_US = 'faker/locale/en_US',
//   en_ZA = 'faker/locale/en_ZA',
//   es = 'faker/locale/es',
//   es_MX = 'faker/locale/es_MX',
//   fa = 'faker/locale/fa',
//   fi = 'faker/locale/fi',
//   fr = 'faker/locale/fr',
//   fr_CA = 'faker/locale/fr_CA',
//   fr_CH = 'faker/locale/fr_CH',
//   ge = 'faker/locale/ge',
//   id_ID = 'faker/locale/id_ID',
//   it = 'faker/locale/it',
//   ja = 'faker/locale/ja',
//   ko = 'faker/locale/ko',
//   nb_NO = 'faker/locale/nb_NO',
//   nep = 'faker/locale/nep',
//   nl = 'faker/locale/nl',
//   nl_BE = 'faker/locale/nl_BE',
//   pl = 'faker/locale/pl',
//   pt_BR = 'faker/locale/pt_BR',
//   pt_PT = 'faker/locale/pt_PT',
//   ro = 'faker/locale/ro',
//   ru = 'faker/locale/ru',
//   sk = 'faker/locale/sk',
//   sv = 'faker/locale/sv',
//   tr = 'faker/locale/tr',
//   uk = 'faker/locale/uk',
//   vi = 'faker/locale/vi',
//   zh_CN = 'faker/locale/zh_CN',
//   zh_TW = 'faker/locale/zh_TW',
// }

export function useFaker(locale?: string) {
  // faker.setLocale(locale);

  const generateFakerInstance = () => {
    const instanceObj = {};

    Object.entries(faker).forEach(([, val]) => {
      if (typeof val === 'object') {
        Object.entries(val).forEach(([k, v]) => {
          instanceObj[k] = v;
        });
      }
    });

    return instanceObj as FakerTypes;
  };

  const fakerInstance = generateFakerInstance();

  return { faker: faker, fakerInstance };
}
