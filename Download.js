// JS Document
// Trigger a document download
// Ben Anderson 2016 - 2021

/**
 * 
 * @param {The data to be downloaded as Array<string>} data 
 * @param {The filename, including extension (EG: myfile.txt)} filename 
 * @param {The mimetype so a blob can be generated} mimetype 
 * @returns 
 */
var DownloadJS = function (data, filename, mimetype)
{
    if (!data) {
        throw {
            name: 'Argument Null Exception',
            nameof: 'data',
            description: 'The supplied variable is null'
        }
    }

    if (!filename) {
        throw {
            name: 'Argument Null Exception',
            nameof: 'filename',
            description: 'The supplied variable is null'
        }
    }

    if (!mimetype) {
        throw {
            name: 'Argument Null Exception',
            nameof: 'mime',
            description: 'The supplied variable is null'
        }
    }

    if (!Array.isArray(data)) {
        throw {
            name: 'Type Error',
            nameof: 'data',
            description: 'Supplied data is not an array'
        }
    }

    // Without the parameter '\ufeff' the charset is changed after blob generation
    // however it does not work in IE11, so wrap it in a try catch
    // '\ufeff' is the UTF-8 BOM

    var objectBlob;

    try{
        objectBlob = new Blob(['\ufeff', data], { type: mimetype });
    } catch (e)
    {
        var bb = new window.MSBlobBuilder();
        bb.append(['\ufeff']);
        bb.append(data);
        objectBlob = bb.getBlob();
    }
    

    if (!navigator.msSaveOrOpenBlob) {
        var objUrl = URL.createObjectURL(objectBlob);

        var a = document.createElement('a');
        a.download = filename;
        a.href = objUrl;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        /*In linux the link download element was removed too soon. this way would help.
         * For now this is the better approach I think.
         * */
        setTimeout(function ()
        {
            a.remove();
            a = undefined;
            URL.revokeObjectURL(objUrl);
            return;
        }, 5000);
    } else {
        navigator.msSaveOrOpenBlob(objectBlob, filename);
        return;
    }
}

/**
 * 
 * @param {A Blob object} blob 
 * @param {A filename, including extension (EG: myfile.txt)} filename 
 * @returns 
 */
var DownloadBlob = function(blob, filename)
{
    if (!blob) {
        throw {
            name: 'Argument Null Exception',
            nameof: 'blob',
            description: 'The supplied variable is null'
        }
    }

    if (!filename) {
        throw {
            name: 'Argument Null Exception',
            nameof: 'filename',
            description: 'The supplied variable is null'
        }
    }

    if (!navigator.msSaveOrOpenBlob) {
        var objUrl = URL.createObjectURL(blob);

        var a = document.createElement('a');
        a.download = filename;
        a.href = objUrl;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        /*In linux the link download element was removed too soon. this way would help.
         * For now this is the better approach I think.
         * */
        setTimeout(function ()
        {
            a.remove();
            a = undefined;
            URL.revokeObjectURL(objUrl);
            return;
        }, 5000);
    } else {
        navigator.msSaveOrOpenBlob(blob, filename);
        return;
    }
}