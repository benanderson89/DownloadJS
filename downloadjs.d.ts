/**
 * 
 * @param data The data to be downloaded as Array<string> 
 * @param filename A filename, including extension (EG: myfile.txt)
 * @param mimetype A mimetype so a blob can be generated
 */
declare function DownloadJS(data: string[], filename: string, mimetype: string): void;
/**
 * 
 * @param blob A Blob object
 * @param filename A filename, including extension (EG: myfile.txt)
 */
declare function DownloadBlob(blob: Blob, filename: string): void;