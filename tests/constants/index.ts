export const payloadSample =
  'xrpl:payload?blob=1100612200000000240000000125000000072D0000000055DF530FB14C5304852F20080B0A8EEF3A6BDD044F41F4EBBD68B8B321145FE4FF6240000002540BE4008114D0F5430B66E06498D4CEEC816C7B3337F9982337';

export const txSample =
  'xrpl:tx?hash=73734B611DDA23D3F5F62E20A173B78AB8406AC5015094DA53F53D39B9EDB06C';

export const lgrSample = 'xrpl:ledger?seq=7295400';

export const accountSample = 'xrpl:account?address=rpfBYsmNBB7Y6z7qHS8g26KE3y3hHaTxkq&tag=000001';

export const offlineSample =
  'xrpl:offline?blob=120007220008000024001ABED82A2380BF2C2019001ABED764D55920AC9391400000000000000000000000000055534400000000000A20B3C85F482532A9578DBB3950B85CA06594D165400000037E11D60068400000000000000A732103EE83BB432547885C219634A1BC407A9DB0474145D69737D09CCDC63E1DEE7FE3744630440220143759437C04F7B61F012563AFE90D8DAFC46E86035E1D965A9CED282C97D4CE02204CFD241E86F17E011298FC1A39B63386C74306A5DE047E213B0F29EFA4571C2C8114DD76483FACDEE26E60D8A586BB58D09F27045C46';

export const ctiSample = 'xrpl:cti?id=17475295679037553836033';

export const versionSample = 'xrpl:ledger?seq=7295400';

export const randomSample = 'xrp:ledger?seq=7295400';

export const randomVersionSample = 'xrpl-v0.1.3:ledger?seq=7295400';

export const typeUnknown = 'xrpl-v0.1.3?seq=7295400';

export const payloadSampleBeta =
  'xrpl-v0.0.3-beta:payload?blob=1100612200000000240000000125000000072D0000000055DF530FB14C5304852F20080B0A8EEF3A6BDD044F41F4EBBD68B8B321145FE4FF6240000002540BE4008114D0F5430B66E06498D4CEEC816C7B3337F9982337';

export const txSampleBeta =
  'xrpl-v0.0.3-beta:tx?hash=73734B611DDA23D3F5F62E20A173B78AB8406AC5015094DA53F53D39B9EDB06C';

export const lgrSampleBeta = 'xrpl-v0.0.3-beta:ledger?seq=7295400';

export const accountSampleBeta =
  'xrpl-v0.0.3-beta:account?address=rpfBYsmNBB7Y6z7qHS8g26KE3y3hHaTxkq&tag=000001';

export const offlineSampleBeta =
  'xrpl-v0.0.3-beta:offline?blob=120007220008000024001ABED82A2380BF2C2019001ABED764D55920AC9391400000000000000000000000000055534400000000000A20B3C85F482532A9578DBB3950B85CA06594D165400000037E11D60068400000000000000A732103EE83BB432547885C219634A1BC407A9DB0474145D69737D09CCDC63E1DEE7FE3744630440220143759437C04F7B61F012563AFE90D8DAFC46E86035E1D965A9CED282C97D4CE02204CFD241E86F17E011298FC1A39B63386C74306A5DE047E213B0F29EFA4571C2C8114DD76483FACDEE26E60D8A586BB58D09F27045C46';

export const ctiSampleBeta = 'xrpl-v0.0.3-beta:cti?id=17475295679037553836033';

export const versionSampleBeta = 'xrpl-v0.0.3-beta:ledger?seq=7295400';

export const randomSampleBeta = 'xrp-v0.0.3-beta:ledger?seq=7295400';

export const typeUnknownBeta = 'xrpl-v0.0.3-beta?seq=7295400';

export const decodedAccount = {
  protocol: 'xrpl',
  version: '0.0.3-beta',
  type: 'account',
  params: {
    address: 'rpfBYsmNBB7Y6z7qHS8g26KE3y3hHaTxkq',
    tag: '000001',
  },
};

export const decodedPayload = {
  protocol: 'xrpl',
  version: '0.0.3-beta',
  type: 'payload',
  params: {
    blob: '1100612200000000240000000125000000072D0000000055DF530FB14C5304852F20080B0A8EEF3A6BDD044F41F4EBBD68B8B321145FE4FF6240000002540BE4008114D0F5430B66E06498D4CEEC816C7B3337F9982337',
  },
};

export const decodedLedger = {
  protocol: 'xrpl',
  version: '0.0.3-beta',
  type: 'ledger',
  params: {
    seq: '7295400',
  },
};

export const decodedOffline = {
  protocol: 'xrpl',
  version: '0.0.3-beta',
  type: 'offline',
  params: {
    blob: '120007220008000024001ABED82A2380BF2C2019001ABED764D55920AC9391400000000000000000000000000055534400000000000A20B3C85F482532A9578DBB3950B85CA06594D165400000037E11D60068400000000000000A732103EE83BB432547885C219634A1BC407A9DB0474145D69737D09CCDC63E1DEE7FE3744630440220143759437C04F7B61F012563AFE90D8DAFC46E86035E1D965A9CED282C97D4CE02204CFD241E86F17E011298FC1A39B63386C74306A5DE047E213B0F29EFA4571C2C8114DD76483FACDEE26E60D8A586BB58D09F27045C46',
  },
};

export const decodedTx = {
  protocol: 'xrpl',
  version: '0.0.3-beta',
  type: 'tx',
  params: {
    hash: '73734B611DDA23D3F5F62E20A173B78AB8406AC5015094DA53F53D39B9EDB06C',
  },
};

export const decodedVersion = {
  protocol: 'xrpl',
  version: '0.0.3-beta',
  type: 'ledger',
  params: {
    seq: '7295400',
  },
};

export const decodedCti = {
  protocol: 'xrpl',
  version: '0.0.3-beta',
  type: 'cti',
  params: {
    id: '17475295679037553836033',
    networkId: 1,
    ledger_index: 62084722,
    txn_index: 25,
  },
};

export default {
  payloadSample,
  txSample,
  lgrSample,
  offlineSample,
  versionSample,
  payloadSampleBeta,
  txSampleBeta,
  lgrSampleBeta,
  offlineSampleBeta,
  versionSampleBeta,
  decodedAccount,
  decodedLedger,
  decodedOffline,
  decodedPayload,
  decodedTx,
  decodedVersion,
};
