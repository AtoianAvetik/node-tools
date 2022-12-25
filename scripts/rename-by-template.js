import * as fs from 'fs';
import * as path from 'path';

export function renameByTemplate(dir, reg, rename) {
    const res = [];
    fs.readdir(dir,  (err, files) => {
        if (err) {
            console.log('Unable to scan directory: ' + err);
        }
        files.forEach((file, i) => {
            // check if directory exists
            const p = path.join(dir, file);
            if (fs.existsSync(p) && !fs.lstatSync(p).isDirectory() && file.includes(reg)) {
                res.push(file);
            }
            if (i + 1 === files.length) {
                console.log('111');
                res.forEach(name => {
                    fs.rename(path.join(dir, name), path.join(dir, name.replace(reg, rename)), function(err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("Successfully renamed the files.")
                        }
                    })
                });
            }
        });
    });
}
