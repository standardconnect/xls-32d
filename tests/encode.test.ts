import * as constants from './constants';
import xls32d from '../dist/src/index';
import * as input from './constants/input';

describe('encode', () => {
  test('account', () => {
    expect(xls32d.encode(input.Account)).toBe(constants.accountSample);
  });

  test('payload', () => {
    expect(xls32d.encode(input.Payload)).toBe(constants.payloadSample);
  });

  test('ledger', () => {
    expect(xls32d.encode(input.Ledger)).toBe(constants.lgrSample);
  });

  test('offline', () => {
    expect(xls32d.encode(input.Offline)).toBe(constants.offlineSample);
  });

  test('transaction', () => {
    expect(xls32d.encode(input.Tx)).toBe(constants.txSample);
  });

  test('cti', () => {
    expect(xls32d.encode(input.Cti)).toBe(constants.ctiSample);
  });

  test('version', () => {
    expect(xls32d.encode(input.Version)).toBe(constants.versionSampleBeta);
  });
});
