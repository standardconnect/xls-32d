import utils from './utils';
import { decode, encode } from './helpers';
import { generateQRCodeToBase64 as qr } from './utils/qr';

export { decode, encode, utils, qr };

export default { decode, encode, qr, utils };
