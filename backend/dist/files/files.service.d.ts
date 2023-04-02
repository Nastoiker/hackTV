/// <reference types="node" />
import { FileElementResponse } from './dto/fileElement.response';
import { MFile } from './mfile.class';
export declare class FilesService {
    saveFiles(files: MFile[]): Promise<FileElementResponse[]>;
    convertToWebp(file: Buffer): Promise<Buffer>;
}
