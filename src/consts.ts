import path from 'path';

// With the move to TSUP as a build tool, this keeps path routes in other files (installers, loaders, etc) in check more easily.
// Path is in relation to a single index.js file inside ./dist
export const PKG_ROOT = path.join(__dirname, '../', '../');

export const DEFAULT_APP_NAME = 'xls-32d';
