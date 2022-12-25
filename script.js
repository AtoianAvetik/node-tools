import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

import { asyncDeepScanDirectory } from './scripts/scan-directory.js';
import { moveToDir } from './scripts/move-to-dir.js';
import { renameByTemplate } from './scripts/rename-by-template.js';
import { groupFilesToFolders } from './scripts/group-files-to-folders.js';
import { writeFileSyncRecursive } from "./scripts/write-file.js";
import { wrapDirFilesToDirs } from "./scripts/wrap-to-dir.js";
import { generateVideoTasks } from "./custom-scripts/generate-video-tasks.js";
const templates = JSON.parse(fs.readFileSync('./DATA FOLDER/templates.json'));

let testDir = 'W:\\WORKSPACE\\PROJECTS\\MY\\LIBS\\node-tools\\TEST FOLDER';
let dataDir = 'W:\\WORKSPACE\\PROJECTS\\MY\\LIBS\\node-tools\\DATA FOLDER';

// asyncDeepScanDirectory(dir, '').then(res => {
//     const folders = res.allChildren.filter(c => c.includes('-['))
//     console.log('[RESULT]: ', folders);
//     folders.forEach((f, i) => {
//         generateVideoTasks(path.join(dir, f), path.join(dataDir, `data-${i + 1}.json`), templates, 2);
//     });
// })
// wrapDirFilesToDirs(dir);
// generateVideoTasks(dir, path.join(dataDir, 'data.json'), templates, 2);
