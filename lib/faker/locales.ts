import { Language } from '../types';

export const prefixByLocale: Record<Language, string[]> = {
  en: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'],
  gb: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'],
  ar: ['السيد', 'السيدة', 'الآنسة', 'الدكتور', 'الأستاذ'],
  zh_CN: ['先生', '女士', '小姐', '博士', '教授'],
  de: ['Herr', 'Frau', 'Dr.', 'Prof.'],
  es: ['Sr.', 'Sra.', 'Srta.', 'Dr.', 'Prof.'],
  fr: ['M.', 'Mme.', 'Mlle.', 'Dr.', 'Prof.'],
  it: ['Sig.', 'Sig.ra', 'Sig.na', 'Dott.', 'Prof.'],
  ja: ['さん', '様', '先生', '教授'],
  ko: ['씨', '님', '박사', '교수'],
  pt: ['Sr.', 'Sra.', 'Srta.', 'Dr.', 'Prof.'],
  ru: ['г-н', 'г-жа', 'д-р', 'проф.']
};

export const chineseNames = {
  firstName: ['李', '王', '张', '刘', '陈', '杨', '黄', '赵', '吴', '周'],
  lastName: ['伟', '芳', '娜', '秀英', '敏', '静', '丽', '强', '磊', '军'],
  fullName: ['李伟', '王芳', '张丽', '刘伟', '陈静', '杨秀英', '黄磊', '赵军', '吴敏', '周娜']
};

export const middleNamesByLocale: Record<Language, string[]> = {
  en: ['James', 'Marie', 'Elizabeth', 'John', 'Anne', 'Robert', 'Lee', 'Michael', 'Rose', 'William'],
  gb: ['James', 'Marie', 'Elizabeth', 'John', 'Anne', 'Robert', 'Lee', 'Michael', 'Rose', 'William'],
  es: ['María', 'José', 'Antonio', 'Juan', 'Luis', 'Carlos', 'Miguel', 'Francisco', 'Pedro', 'Manuel'],
  fr: ['Marie', 'Pierre', 'Jean', 'Louis', 'François', 'Henri', 'Claude', 'Michel', 'André', 'Paul'],
  de: ['Maria', 'Josef', 'Peter', 'Hans', 'Wolfgang', 'Karl', 'Heinrich', 'Thomas', 'Michael', 'Andreas'],
  it: ['Maria', 'Giuseppe', 'Antonio', 'Giovanni', 'Luigi', 'Francesco', 'Paolo', 'Marco', 'Andrea', 'Pietro'],
  pt: ['Maria', 'José', 'António', 'João', 'Manuel', 'Francisco', 'Paulo', 'Pedro', 'Carlos', 'Miguel'],
  ru: ['Иванович', 'Петрович', 'Александрович', 'Сергеевич', 'Николаевич', 'Михайлович', 'Андреевич', 'Владимирович'],
  // Languages that typically don't use middle names
  ar: [],
  zh_CN: [],
  ja: [],
  ko: []
};