import * as constants from './constants';
import xls32d from '../dist/src/index';
import * as input from './constants/input';

describe('encode', () => {
  test('account', () => {
    expect(xls32d.encode(input.Account)).toBe(constants.accountSampleBeta);
  });

  test('payload', () => {
    expect(xls32d.encode(input.Payload)).toBe(constants.payloadSampleBeta);
  });

  test('ledger', () => {
    expect(xls32d.encode(input.Ledger)).toBe(constants.lgrSampleBeta);
  });

  test('offline', () => {
    expect(xls32d.encode(input.Offline)).toBe(constants.offlineSampleBeta);
  });

  test('transaction', () => {
    expect(xls32d.encode(input.Tx)).toBe(constants.txSampleBeta);
  });

  test('version', () => {
    expect(xls32d.encode(input.Version)).toBe(constants.versionSampleBeta);
  });
});
