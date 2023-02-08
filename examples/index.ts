import xls32d from '../dist/src';
import { IAccountEncodeOpts, ICtiEncodeOpts } from '../dist/types';

const mod = {
  networkId: 1,
  ledger_hash: 'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
  ledger_index: '62084722',
  txn_hash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
  txn_index: '25',
};

const { uri, cti, bigInt, hex, bin, bytes } = new xls32d.utils.cti.Encode(mod);
console.log(uri, cti, bigInt, hex, bin, bytes);

const input: ICtiEncodeOpts = {
  type: 'cti',
  params: {
    networkId: 1,
    ledger_hash: 'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
    ledger_index: '62084722',
    txn_hash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
    txn_index: '25',
  },
};

const inputa: IAccountEncodeOpts = {
  type: 'account',
  params: {
    xaddress: 'rpfBYsmNBB7Y6z7qHS8g26KE3y3hHaTxkq',
  },
};

const main = async () => {
  const uri32 = xls32d.encode(input);
  console.log(uri32);

  const duri32 = await xls32d.decode('xrpl:cti?id=17475295679037553836033');
  console.log(duri32);

  const durai32 = await xls32d.decode(
    'xrpl:account?address=rpfBYsmNBB7Y6z7qHS8g26KE3y3hHaTxkq&tag=000001'
  );

  console.log(durai32);

  const uria32 = xls32d.encode(inputa);

  console.log(uria32);
};

main();
