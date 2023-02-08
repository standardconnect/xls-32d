import { getVersion } from 'utils/getVersion';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';

const jwt_key = 'my secret';
const providerEndpoint = '/this/is/the/recieving/point';

const defaultResponse = {
  version: getVersion(),
  supported: true,
};

export interface Request {
  host?: string;
  domain?: string;
  origin?: string;
  ip?: string;
  uuid?: string;
}
export interface Response {
  version: string;
  supported: boolean;
  endpoint?: string;
  jwt?: string;
}

// This is a provider to be installed on the receiver of the URL
// Provider shall be hosted at a default standardized endpoint
// For the purposes of this example, this provider will be hosted at
// https://localhost:3000/sc

export class Provider {
  req: Request;
  res: Response = defaultResponse;
  uuid: string = uuid();
  key: string;
  secret: string;
  credentials: { key: string; secret: string };
  endpoint: string;

  constructor({ key, secret }: { key: string; secret: string }, request: Request = {}) {
    this.key = key;
    this.secret = secret;
    this.req = request;
    this.credentials = { key: this.key, secret: this.secret };
    this.endpoint = providerEndpoint;
    if (this.endpoint) this.res.endpoint = this.endpoint;
    this.res.jwt = this.write();
  }

  private write = () =>
    jwt.sign(Object.assign(this.credentials, { uuid: this.uuid }), jwt_key, {
      expiresIn: '7d',
    });

  public response = () => this.res;
}
