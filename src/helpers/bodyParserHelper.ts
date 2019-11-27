import { IncomingMessage } from "http";

export const bodyParser = async (request: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    const body: any = [];
    
    request
      .on('error', err => reject(err.message))
      .on('data', chunk => body.push(chunk))
      .on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        resolve(parsedBody)
      })
  })
}
