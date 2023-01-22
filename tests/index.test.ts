import * as constants from './constants';
import xls32d from '../dist/src/index';

describe('utils', () => {
  test('scheme', () => {
    expect(xls32d.utils.parse.getScheme(constants.accountSample)).toBe('xrpl');
  });

  test('version', async () => {
    expect(await xls32d.utils.parse.getVersion(constants.versionSample)).toBe('0.1.3');
  });

  test('default version', async () => {
    expect(await xls32d.utils.parse.getVersion(constants.payloadSample)).toBe('0.0.1');
  });

  test('xrpl uri', async () => {
    expect(xls32d.utils.parse.isXrplUri(constants.payloadSample)).toBe(true);
  });

  test('bad uri', async () => {
    expect(xls32d.utils.parse.isXrplUri(constants.randomSample)).toBe(false);
  });

  test('getParams', async () => {
    expect(xls32d.utils.parse.getParams(constants.payloadSample)).toMatchObject({
      tx: '1100612200000000240000000125000000072D0000000055DF530FB14C5304852F20080B0A8EEF3A6BDD044F41F4EBBD68B8B321145FE4FF6240000002540BE4008114D0F5430B66E06498D4CEEC816C7B3337F9982337',
    });
  });

  test('getType', async () => {
    expect(xls32d.utils.parse.getType(constants.payloadSample)).toBe('payload');
  });

  test('getTypeUnknown', async () => {
    expect(() => {
      expect(xls32d.utils.parse.getType(constants.typeUnknown));
    }).toThrow('Syntax Error: No type idenitier detected. See xls-32d for more information');
  });
});
