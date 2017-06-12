// JS Document
// Trigger a document download
// Ben Anderson 2016

var DownloadJS = function (blob, filename, mimetype) {
    if (!blob) {
        throw {
            name: "Argument Null Exception",
            nameof: "blob",
            description: "The supplied variable is null"
        }
    }

    if (!filename) {
        throw {
            name: "Argument Null Exception",
            nameof: "filename",
            description: "The supplied variable is null"
        }
    }

    if (!mimetype) {
        throw {
            name: "Argument Null Exception",
            nameof: "mime",
            description: "The supplied variable is null"
        }
    }

    if (!Array.isArray(blob)) {
        throw {
            name: "Type Error",
            nameof: "blob",
            description: "Supplied data is not an array"
        }
    }

    //Without the parameter "\ufeff" the charset is changed after blob generation
    //however it does not work in IE11, so wrap it in a try catch and use the obsolete blob builder

    var objectBlob;

    try{
        objectBlob = new Blob(["\ufeff", blob], { type: mimetype });
    } catch (e)
    {
        var bb = new window.MSBlobBuilder();
        bb.append(blob);
        objectBlob = bb.getBlob();
    }

    if (!navigator.msSaveOrOpenBlob) {
        var objUrl = URL.createObjectURL(objectBlob);

        var a = document.createElement("a");
        a.download = filename;
        a.href = objUrl;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        /*In linux the link download element was removed too soon. this way would help.
         * For now this is the better approach I think.
         * */
        setTimeout(function () {
            a.remove();
            a = undefined;
            URL.revokeObjectURL(objUrl);
            return;
        }, 100)
    } else {
        navigator.msSaveOrOpenBlob(objectBlob, filename);
        return;
    }
}
