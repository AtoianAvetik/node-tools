import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

import { writeFileSyncRecursive } from "../scripts/write-file.js";
import { asyncDeepScanDirectory, flatMapChildrenRecursive } from "../scripts/scan-directory.js";

export function generateVideoTasks(dir, dataPath, templates, lvl = 1) {
    asyncDeepScanDirectory(dir, '', false, lvl).then(res => {
        let data = [];
        console.log(
            flatMapChildrenRecursive(res, false, true)
                .filter(p => !p.includes('.mp4'))
        );
        const files = flatMapChildrenRecursive(res, false, true)
            .filter(p => p.includes('.mp4'));
        files.forEach(file => {
            data = [
                ...data,
                ...templates.map((tmp) => {
                    const parts = file.split('\\');
                    const name = parts.pop();
                    const parent = parts.pop();
                    return {
                        id: crypto.randomUUID(),
                        type: 'video',
                        name: `${tmp.name}: ${name}`,
                        config: {
                            ...tmp.data,
                            general: {
                                ...tmp.data.general,
                                inputFile: file,
                                outputFolder: tmp.name !== 'Video overlay sprite' ? path.join(dir, parent, 'SCREENS') : '',
                            },
                        },
                    }
                }),
            ];
        });
        writeFileSyncRecursive(dataPath, JSON.stringify(data, null, 4), 'utf-8');
    });
}

