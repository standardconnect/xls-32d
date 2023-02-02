import utils from 'utils/index';
import { decode, encode } from 'helpers/index';
import { generateQRCodeToBase64 as qr } from 'utils/qr';

export { decode, encode, utils, qr };

export default { decode, encode, qr, utils };
