import * as fs from 'fs';
import * as path from 'path';

export function flatMapChildrenRecursive(data, directories, files) {
    if (data.allChildren?.length) {
        return [
            ...data.allChildren.map(name => path.join(data.dir, name)),
            ...data.children.flatMap(child =>
                flatMapChildrenRecursive(child, directories, files),
            ),
        ]
            .filter(p => fs.existsSync(p))
            .filter(p =>
                !fs.lstatSync(p).isDirectory() || directories,
            )
            .filter(p =>
                fs.lstatSync(p).isDirectory() || files,
            );
    }
    return [];
}

export function checkMatchRecursive(data) {
    if (!data.matchedChildren?.length) {
        if ( data.children.length ) {
            return data.children.some(checkMatchRecursive);
        }
        return false;
    }
    return true;
}

export async function asyncDeepScanDirectory(dir, term, inverse, lvl = 3, currLvl = 1) {
    return new Promise(((resolve, reject) => {
        let result = {
            dir,
            matchedTree: {},
            matchedChildren: [],
            allChildren: [],
            children: []
        };
        scanDirectory(dir, term, inverse, (res) => {
            let finish = true;
            if ( currLvl <= lvl ) {
                result = {
                    ...result,
                    ...res,
                };
                const promises = res.allChildren
                    .map(file => path.join(dir, file))
                    .filter(p => fs.existsSync(p) && fs.lstatSync(p).isDirectory())
                    .map(p => asyncDeepScanDirectory(p, term, inverse, lvl, currLvl + 1));
                if (promises.length > 0) {
                    finish = false;
                }
                Promise.all(promises).then((values) => {
                    const v = values.filter(Boolean);
                    result.children = v;
                    result.matchedTree = (v || [])
                        .reduce((acc, child) => ({
                            ...acc,
                            [child.dir]: checkMatchRecursive(child),
                        }), {});
                    resolve(result);
                });
            }
            if (finish) {
                resolve(currLvl > lvl ? null : result);
            }
        }, reject);
    }));
}

export async function asyncScanDirectory(dir, term, inverse) {
    return new Promise(((resolve, reject) => {
        scanDirectory(dir, term, inverse, resolve, reject);
    }));
}

export function scanDirectory(dir, term, inverse, resolve, reject) {
    const res = {
        dir,
        matchedChildren: [],
        allChildren: [],
    };
    fs.readdir(dir, (err, files) => {
        if (err) {
            reject('Unable to scan directory: ' + err);
            return console.log('Unable to scan directory: ' + err);
        }
        res.allChildren = files;
        files.forEach((file, i) => {
            const matched = inverse ? !file.includes(term) : file.includes(term);
            if (matched) {
                res.matchedChildren.push(file);
            }
        });
        resolve(res);
    });
}
