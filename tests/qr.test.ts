import * as constants from './constants';
import xls32d from '../dist/src/index';
import fs from 'fs-extra';

const dir = './tests/output';

describe('qr', () => {
  test('payload base64', async () => {
    let uri = await xls32d.uri.encode(constants.decodedPayload);
    let base64 = await xls32d.qr(uri);
    fs.writeFileSync(`${dir}/base64.txt`, base64);
  });

  test('payload buffer', async () => {
    let uri = await xls32d.uri.encode(constants.decodedPayload);
    let buffer = await xls32d.utils.qr.generateQRCodeToBuffer(uri);
    fs.writeFileSync(`${dir}/buffer.json`, JSON.stringify(buffer.toJSON()));
  });

  test('payload to file', async () => {
    let uri = await xls32d.uri.encode(constants.decodedPayload);
    await xls32d.utils.qr.generateQRCodeToFile(`${dir}/test.png`, uri);
  });
});
