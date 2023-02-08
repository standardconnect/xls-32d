import { URL } from './procedure';

// This is a helper client which will be used to manufacture the correct URL/URI
// The clients main prupose is to make sure that the provided domain supports xls32-d
// and is so, retrieves a jwt and endpoint
// With the jwt and endpoint, the request manufacturer can product the correct URL/URI

// The client will also be used to receive incoming URI/URLs, check their validity and parse information for custom client-side handling

export class Client {
  constructor() {}

  // check to see if domain has a provider and determine the appropiate endpoint for the manufacturing of the url

  // required this this feature
  // this.endpoint and this.jwt
  //encode = (url:string) => new URL().encode(url)

  decode = (url: string) => new URL().decode(url);
}
