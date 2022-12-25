import * as fs from 'fs';
import * as path from 'path';
import { moveToDir } from './move-to-dir.js';

export async function groupFilesToFolders(dir, amountChars) {
    return new Promise(((resolve, reject) => {
        const res = [];
        fs.readdir(dir,  (err, files) => {
            if (err) {
                reject('Unable to scan directory: ' + err);
                return console.log('Unable to scan directory: ' + err);
            }
            for (const file of files) {
                if (!file) {
                    continue;
                }
                const p = path.join(dir, file);
                if (fs.lstatSync(p).isDirectory()) {
                    continue;
                }
                const groupKey = file.slice(0, amountChars);
                res.push({
                    fileName: file,
                    currDir: dir,
                    newDir: path.join(dir, groupKey),
                });
            }
            res.forEach(obj => {
                moveToDir(obj.fileName, obj.currDir, obj.newDir, (err) => {
                    console.log(obj.fileName, err);
                });
            });
        });
    }));
}
