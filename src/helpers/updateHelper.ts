export const update = (parsedBody: any, rows: any): Promise<any> => {
  const requestData = JSON.parse(parsedBody);
    const [record] = rows;

    for (const param in requestData) {
      if(requestData.hasOwnProperty(param)) {
        if (param === 'id') {
          return Promise.reject('You cannot change ID'); 
        }
        record[param] = requestData[param];
      }
    };
  
  return Promise.resolve(record);
}