import https from 'https';
import { getVersion } from './getVersion';
import { logger } from './logger';

type DistTagsBody = {
  latest: string;
};

export const checkForLatestVersion = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    https
      .get('https://registry.npmjs.org/-/package/xls-32d/dist-tags', (res) => {
        if (res.statusCode === 200) {
          let body = '';
          res.on('data', (data) => (body += data));
          res.on('end', () => {
            resolve((JSON.parse(body) as DistTagsBody).latest);
          });
        } else {
          reject();
        }
      })
      .on('error', () => {
        // logger.error("Unable to check for latest version.");
        reject();
      });
  });
};

export const renderVersionWarning = (npmVersion: string) => {
  const currentVersion = getVersion();

  //   console.log("current", currentVersion);
  //   console.log("npm", npmVersion);

  if (currentVersion.includes('beta')) {
    logger.warn('  You are using a beta version.');
    logger.warn('  Please report any bugs you encounter.');
  } else if (currentVersion !== npmVersion) {
    logger.warn('  You are using an outdated version.');
    logger.warn(
      '  Your version:',
      currentVersion + '.',
      'Latest version in the npm registry:',
      npmVersion
    );
    logger.warn('  Please run the CLI with @latest to get the latest updates.');
  }
  console.log('');
};
