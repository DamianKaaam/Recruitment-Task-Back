export const getParamValue = (url: string, paramName: string): string => {
  const [ slug, params ] = url.split('?');
  const paramsArr = params.split('&');
  let searchedParam = '';
  paramsArr.forEach(param => {
    const [ key, value ] = param.split('=');
    if (key === paramName) {
      searchedParam = value;
    }
  });

  return searchedParam;
}