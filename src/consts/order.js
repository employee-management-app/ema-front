import { ReactComponent as LowPriorityIcon } from '../assets/icons/priorities/low.svg';
import { ReactComponent as NormalPriorityIcon } from '../assets/icons/priorities/normal.svg';
import { ReactComponent as HighPriorityIcon } from '../assets/icons/priorities/high.svg';
import { ReactComponent as CriticalIcon } from '../assets/icons/priorities/critical.svg';

const DEFAULT_PRODUCT_TYPE_OPTIONS = [
  {
    label: 'Osłony wewnętrzne (rolety, żaluzje, plisy)',
    value: 'Osłony wewnętrzne',
  },
  {
    label: 'Osłony zewnętrzne (rolety, żaluzje, screeny, moskitiery)',
    value: 'Osłony zewnętrzne',
  },
  {
    label: 'Ogród (pergole, markizy)',
    value: 'Ogród',
  },
  {
    label: 'Inne (proszę opisać w polu Description)',
    value: 'Inne',
  },
];

const REAL_ESTATE_PRODUCT_TYPE_OPTIONS = [
  {
    label: 'Serwis drzwi/bramy',
    value: 'Serwis drzwi/bramy',
  },
  {
    label: 'Prace porządkowe (sprzątanie)',
    value: 'Prace porządkowe',
  },
  {
    label: 'Utrzymanie chodników i dróg (odśnieżanie/solenie)',
    value: 'Utrzymanie chodników i dróg',
  },
  {
    label: 'Pielęgnacja zieleni',
    value: 'Pielęgnacja zieleni',
  },
];

const SECURITY_SYSTEM_PRODUCT_TYPE_OPTIONS = [
  {
    value: 'CCTV',
    label: 'CCTV',
  },
  {
    value: 'SSWiN',
    label: 'SSWiN',
  },
  {
    value: 'KD',
    label: 'KD',
  },
  {
    value: 'Inne',
    label: 'Inne',
  },
];

const ENERGY_SYSTEM_PRODUCT_TYPE_OPTIONS = [
  {
    label: 'Ogrzewanie (gazowe)',
    value: 'Ogrzewanie (gazowe)',
  },
  {
    label: 'Ogrzewanie (pompy ciepła)',
    value: 'Ogrzewanie (pompy ciepła)',
  },
  {
    label: 'Klimatyzacja',
    value: 'Klimatyzacja',
  },
  {
    label: 'Elektryka',
    value: 'Elektryka',
  },
];

const MAGAS_PRODUCT_TYPE_OPTIONS = [
  {
    label: 'Rolety materiałowe',
    value: 'Rolety materiałowe',
  },
  {
    label: 'Rolety dzień-noc',
    value: 'Rolety dzień-noc',
  },
  {
    label: 'Żaluzje drewniane',
    value: 'Żaluzje drewniane',
  },
  {
    label: 'Żaluzje aluminiowe',
    value: 'Żaluzje aluminiowe',
  },
  {
    label: 'Plisy',
    value: 'Plisy',
  },
  {
    label: 'Rolety zewnętrzne',
    value: 'Rolety zewnętrzne',
  },
  {
    label: 'Moskitiery',
    value: 'Moskitiery',
  },
  {
    label: 'Żaluzje fasadowe',
    value: 'Żaluzje fasadowe',
  },
  {
    label: 'Rolety Screen',
    value: 'Rolety Screen',
  },
  {
    label: 'Markizy',
    value: 'Markizy',
  },
  {
    label: 'Pergole',
    value: 'Pergole',
  },
  {
    label: 'Inne',
    value: 'Inne',
  },
];

const HUZZAR_PRODUCT_TYPE_OPTIONS = [
  {
    label: 'Opto',
    value: 'Opto',
  },
  {
    label: 'HFC',
    value: 'HFC',
  },
  {
    label: 'LAN',
    value: 'LAN',
  },
];

const MBIZ_PRODUCT_TYPE_OPTIONS = [
  { label: 'Koncentrator tlenu', value: 'Koncentrator tlenu' },
];

const LINDE_TERMO_PRODUCT_TYPE_OPTIONS = [
  { label: 'Piana otwartokomórkowa', value: 'Piana otwartokomórkowa' },
  { label: 'Piana zamkniętokomórkowa', value: 'Piana zamkniętokomórkowa' },
  { label: 'Piana otwartokomórkowa/zamkniętokomórkowa', value: 'Piana otwartokomórkowa/zamkniętokomórkowa' },
  { label: 'Piana zalewowa', value: 'Piana zalewowa' },
];

export const getProductTypeOptions = (companyId) => {
  if (companyId === '651ebd32365d2688cb5e63cd') {
    return REAL_ESTATE_PRODUCT_TYPE_OPTIONS;
  }

  if (companyId === '65a173aa95adb83fb2b32098') {
    return SECURITY_SYSTEM_PRODUCT_TYPE_OPTIONS;
  }

  if (companyId === '6703b64ae29df1ea971bd5e4') {
    return ENERGY_SYSTEM_PRODUCT_TYPE_OPTIONS;
  }

  if (companyId === '682d7d9a26d1da92821a9860') {
    return MAGAS_PRODUCT_TYPE_OPTIONS;
  }

  if (companyId === '68e4fc920ce18e2e26f604a5') {
    return HUZZAR_PRODUCT_TYPE_OPTIONS;
  }

  if (companyId === '6902072b6cd86d66b818d012') {
    return MBIZ_PRODUCT_TYPE_OPTIONS;
  }

  if (companyId === '698c780124270ec2d7a9cddc') {
    return LINDE_TERMO_PRODUCT_TYPE_OPTIONS;
  }

  return DEFAULT_PRODUCT_TYPE_OPTIONS;
};

const DEFAULT_STAGE_OPTIONS = [
  {
    label: 'Pomiar',
    value: 'Pomiar',
  },
  {
    label: 'Montaż',
    value: 'Montaż',
  },
  {
    label: 'Reklamacja',
    value: 'Reklamacja',
  },
  {
    label: 'Serwis',
    value: 'Serwis',
  },
];

const REAL_ESTATE_STAGE_OPTIONS = [
  {
    label: 'Serwis',
    value: 'Serwis',
  },
];

const SECURITY_SYSTEM_STAGE_OPTIONS = [
  {
    label: 'Oględziny miejsca',
    value: 'Oględziny miejsca',
  },
  {
    label: 'Montaż',
    value: 'Montaż',
  },
  {
    label: 'Serwis/naprawa',
    value: 'Serwis/naprawa',
  },
  {
    label: 'Reklamacja',
    value: 'Reklamacja',
  },
];

const HUZZAR_STAGE_OPTIONS = [
  {
    label: 'Awaria',
    value: 'Awaria',
  },
  {
    label: 'Serwis',
    value: 'Serwis',
  },
  {
    label: 'Wywiad techniczny',
    value: 'Wywiad techniczny',
  },
];

const MBIZ_STAGE_OPTIONS = [
  {
    label: 'Awaria',
    value: 'Awaria',
  },
  {
    label: 'Przegląd',
    value: 'Przegląd',
  },
];

const LINDE_TERMO_STAGE_OPTIONS = [
  { label: 'Ocieplanie pianą PUR', value: 'Ocieplanie pianą PUR' },
  { label: 'Reklamacja', value: 'Reklamacja' },
];

export const getStageOptions = (companyId) => {
  if (companyId === '651ebd32365d2688cb5e63cd') {
    return REAL_ESTATE_STAGE_OPTIONS;
  }

  if (companyId === '65a173aa95adb83fb2b32098') {
    return SECURITY_SYSTEM_STAGE_OPTIONS;
  }

  if (companyId === '68e4fc920ce18e2e26f604a5') {
    return HUZZAR_STAGE_OPTIONS;
  }

  if (companyId === '6902072b6cd86d66b818d012') {
    return MBIZ_STAGE_OPTIONS;
  }

  if (companyId === '698c780124270ec2d7a9cddc') {
    return LINDE_TERMO_STAGE_OPTIONS;
  }

  return DEFAULT_STAGE_OPTIONS;
};

export const PRIORITY_OPTIONS = [
  {
    label: 'Critical',
    icon: CriticalIcon,
    value: '3',
  },
  {
    label: 'High',
    icon: HighPriorityIcon,
    value: '2',
  },
  {
    label: 'Normal',
    icon: NormalPriorityIcon,
    value: '1',
  },
  {
    label: 'Low',
    icon: LowPriorityIcon,
    value: '0',
  },
];
