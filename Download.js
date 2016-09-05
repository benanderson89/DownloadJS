// JS Document
// Trigger a document download
// Ben Anderson 2016

var DownloadJS = function (blob, filename, mimetype)
{
    if(!blob)
    {
        throw {
            name: "Argument Null Exception",
            nameof: "blob",
            description: "The supplied variable is null"
        }
    }

    if(!filename)
    {
        throw {
            name: "Argument Null Exception",
            nameof: "filename",
            description: "The supplied variable is null"
        }
    }

    if(!mimetype)
    {
        throw {
            name: "Argument Null Exception",
            nameof: "mime",
            description: "The supplied variable is null"
        }
    }

    if(!Array.isArray(blob))
    {
        throw {
            name: "Type Error",
            nameof: "blob",
            description: "Supplied data is not an array"
        }
    }

    var objectBlob = new Blob(blob, {type: mimetype});

    if(!navigator.msSaveOrOpenBlob)
    {
        var objUrl = URL.createObjectURL(objectBlob);
        var a = document.createElement("a");
        a.download = filename;
        a.href = objUrl;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        a.remove();
        a = undefined;
        URL.revokeObjectURL(objUrl);
        return;
    } else
    {
        navigator.msSaveOrOpenBlob(objectBlob, filename);
        return;
    }
}