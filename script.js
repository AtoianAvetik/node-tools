import * as fs from 'fs';
import * as path from 'path';

import { asyncDeepScanDirectory } from './scripts/scan-directory.js';
import { moveToDir } from './scripts/move-to-dir.js';
import { renameByTemplate } from './scripts/rename-by-template.js';
import { groupFilesToFolders } from './scripts/group-files-to-folders.js';

let dir = 'W:\\WORKSPACE\\TEST\\NODE\\PLAYGROUND\\TEST FOLDER';

asyncDeepScanDirectory(dir, 'TEST').then(res => {
    console.log('[RESULT]: ', res);
})
