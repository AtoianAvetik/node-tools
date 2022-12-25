import * as fs from 'fs';
import * as path from 'path';

export async function moveToDir(fileName, currDir, newDir, callback) {
    const currPath = path.join(dir, fileName);
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
                callback(err);
            }
            return;
        }
        callback();
    });

    function copy() {
        const readStream = fs.createReadStream(oldPath);
        const writeStream = fs.createWriteStream(newPath);

        readStream.on('error', callback);
        writeStream.on('error', callback);

        readStream.on('close', function () {
            fs.unlink(oldPath, callback);
        });

        readStream.pipe(writeStream);
    }
}
