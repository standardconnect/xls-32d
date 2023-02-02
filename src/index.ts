import utils from 'utils/index';
import { decode, encode } from 'helpers/index';
import { generateQRCodeToBase64 as qr } from 'utils/qr';
import * as types from 'types';

export { decode, encode, utils, qr, types };

export default { decode, encode, qr, utils, types };
