import * as fs from 'fs';
import * as path from 'path';
import { moveToDir } from './move-to-dir.js';

export function wrapDirFilesToDirs(dir) {
    fs.readdir(dir, (err, files) => {
        files
            .filter(name => fs.existsSync(path.join(dir, name)) && !fs.lstatSync(path.join(dir, name)).isDirectory())
            .forEach(file => {
                wrapFileToDir(file, dir);
            });
    });
}

export function wrapFileToDir(fileName, dir) {
    let name = fileName.split('.');
    name.pop();
    name = name.join('.');
    moveToDir(fileName, dir, path.join(dir, name));
}
