const fs = require('fs');
const os = require('os');
const path = require('path');
const tar = require('tar-fs')
const config = require('config');
const fileName = config.get('fileToImport.url');
const toSave = config.get('fileToImport.saved');
const downloadControlFile = config.get('fileToImport.flowControlFile');
const folderExtract = config.get('fileToImport.folderExtract');

const flowControlFile = config.get('fileToImport.flowControlFile');

const stream = require('stream');

class ProcessoDownloadClass {
    constructor() {
        //this.download = this.download ;
    }
    download () {
        return new Promise(async (resolve, reject) => {

            console.log("Download initiated");
            return false;
        });
    }
    /*
    constructor(tempFileControlPath: string = '',
                tempPath : string = '',
                tempFilePath: string = '',
                downloading : boolean = false) {
        this.downloading = downloading;
        this.tempFileControlPath = tempFileControlPath;
        this.tempPath = tempPath;
        this.tempFilePath = tempFilePath;
        fs.writeFile(this.tempFileControlPath, "0", err => {
            if (err) {
              console.error(err);
            } else {
                this.tempFileControlPath = path.join(os.tmpdir(), flowControlFile);
                this.tempPath = path.join(os.tmpdir(), folderExtract);
                this.tempFilePath = path.join(os.tmpdir(), toSave);
                this.downloading = false;
            }
          });
    }
    tempFileControlPath : string = '';
    tempPath : string;
    tempFilePath : string;
    downloading : boolean;
    download = () => {
    return new Promise(async (resolve, reject) => {
        this.downloading = fs.existsSync(this.tempFileControlPath);
        if (!this.downloading) {
            const readableStream = await fetch(fileName).then(r => stream.Readable.fromWeb(r.body));
            const fileToWrite = fs.createWriteStream(this.tempFilePath);
            await readableStream.pipe(fileToWrite);
            fileToWrite.on("finish", () => {
            fileToWrite.close();
                console.log("Download Completed");
                this.downloading = false;
                fs.unlinkSync(this.tempFileControlPath);
            });
        }
        
        resolve(this.downloading);
        });
    }*/
}
var _export = new ProcessoDownloadClass();
exports = module.exports ;

exports.processoDownload = _export;