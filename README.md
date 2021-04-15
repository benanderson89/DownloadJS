# Download.js
###### Cross-browser blob Download

```javascript
/**
 * You can provide string data in an array to DownloadJS with an accompanying filename and mime type. A blob will be generated automatically and a download triggered.
 */
var data = ["data as string in a single cell array (required by 'blob')"];
DownloadJS(data, "filename.txt", "text/plain");

/**
 * If you already have a generated blob, you can download it here -- this method skips the initial blob generation and is handy for binary data
 */
DownloadBlob(blob, "filename.pdf");

```