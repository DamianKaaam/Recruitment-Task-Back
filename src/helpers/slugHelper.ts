export const getSlugValue = (url: string): string => {
  const [ _, slug, searchedValue ] = url.split('/');

  return searchedValue;
}