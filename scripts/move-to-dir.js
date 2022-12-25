import * as fs from 'fs';
import * as path from 'path';

export function moveToDir(fileName, currDir, newDir, callback) {
    const currPath = path.join(currDir, fileName);
    const newPath = path.join(newDir, fileName);
    if (!currDir || !fileName || !fs.existsSync(currPath)) {
        console.log('Unable to read dir or file!');
    }
    if ( !fs.existsSync(newDir) ) {
        fs.mkdirSync(newDir);
    }

    fs.rename(currPath, newPath, function (err) {
        if (err) {
            if (err.code === 'EXDEV') {
                copy();
            } else {
                if (callback) {
                    callback(err);
                }
            }
            return;
        }
        if (callback) {
            callback();
        }
    });

    function copy() {
        const readStream = fs.createReadStream(oldPath);
        const writeStream = fs.createWriteStream(newPath);

        readStream.on('error', callback);
        writeStream.on('error', callback);

        readStream.on('close', function () {
            fs.unlink(currPath, callback);
        });

        readStream.pipe(writeStream);
    }
}
