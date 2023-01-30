import QRCode from 'qrcode';

export const qrCodeToBuffer = async (qrData: string): Promise<Buffer> => {
  try {
    let data = qrData.split(',')[1];
    if (!data) throw 'Could not get buffer from QR Code data';
    return Buffer.from(data, 'base64');
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const generateQRCodeToBuffer = async (uri: string): Promise<Buffer> => {
  let base64 = await QRCode.toDataURL(uri, {
    errorCorrectionLevel: 'H',
  });
  let data = base64.split(',')[1];
  if (!data) throw 'Could not get buffer from QR Code data';
  return Buffer.from(data, 'base64');
};

export const generateQRCodeToBase64 = async (uri: string): Promise<string> =>
  await QRCode.toDataURL(uri, {
    errorCorrectionLevel: 'H',
  });

export const generateQRCodeToFile = async (path: string, uri: string): Promise<void> =>
  await QRCode.toFile(path, uri, {
    errorCorrectionLevel: 'H',
  });

export default {
  qrCodeToBuffer,
  generateQRCodeToBase64,
  generateQRCodeToFile,
  generateQRCodeToBuffer,
};
