
const dictionaries = {
  en: () => import('@@/src/dictionaries/en.json').then((module) => module.default),
  id: () => import('@@/src/dictionaries/id.json').then((module) => module.default),
}
 
export const getDictionary = async (locale) => dictionaries[locale ?? 'id']()