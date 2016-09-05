# Download.js
###### Cross-browser blob Download

```javascript
function download()
{
    var data = ["data as string in a single cell array (required by 'blob')"];
    // data, filename.extension, mime-type
    DownloadJS(data, "filename.txt", "text/plain");
}