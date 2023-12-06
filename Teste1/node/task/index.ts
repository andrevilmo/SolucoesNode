require('dotenv').config({ path: ('.env') })
const config = require("config");
//process.env.NODE_ENV = config.get("environment.name");
process.env.NODE_OPTIONS = config.get("environment.options");
const fileName = config.get(process.env.NODE_ENV + ".fileToImport.url");
const toSave = config.get(process.env.NODE_ENV + ".fileToImport.saved");
const folderExtract = config.get(
  process.env.NODE_ENV + ".fileToImport.folderExtract"
);
const gunzip = require("gunzip-maybe");
const fs = require("fs");
const os = require("os");
const path = require("path");
const tar = require("tar-fs");
const { parse } = require("csv-parse");
const stream = require("stream");
const targz = require("tar.gz");
import { Customers, InsertData, Organizations } from "./models/models";

class ProcessoDownloadClass {
  downloading: boolean;
  tempPath: string;
  tempFilePath: string;
  constructor() {
    this.tempPath = path.join(os.tmpdir(), folderExtract);
    this.tempFilePath = path.join(os.tmpdir(), toSave);
  }
  getFiles = (dir, files = []) => {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
      const name = `${dir}/${file}`;
      if (fs.statSync(name).isDirectory()) {
        this.getFiles(name, files);
      } else {
        if (name.toLocaleLowerCase().endsWith(".csv")) files.push(name);
      }
    }
    return files;
  };
  extract = (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      var _this = this;
      let pastaExtracao = `${this.tempPath}\\extraindo`;
      console.log(
        `Download Completed previuosly ${this.tempFilePath} em ${pastaExtracao}`
      );
      gunzip(this.tempFilePath, pastaExtracao);
      let csvs = this.getFiles(pastaExtracao);
      console.log(csvs);
      for (let i = 0; i < csvs.length; i++) {
        var stats = fs.statSync(csvs[i]);
        if (stats.size > 1024) {
          console.log(`Arquivo a importar : ${csvs[i]} : ${stats.size}`);
          let insercoes: Promise<boolean>[] = [];

          const stream = fs
            .createReadStream(csvs[i])
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", async function (row) {
              let toInsert: InsertData = new InsertData();
              if (csvs[i].toLocaleLowerCase().endsWith(`customers.csv`))
                insercoes.push(toInsert.Insert(new Organizations(row)));
              if (csvs[i].toLocaleLowerCase().endsWith(`organizations.csv`))
                insercoes.push(toInsert.Insert(new Organizations(row)));
              console.log(`Insercoes : ${insercoes.length}`);
              if (insercoes.length > 100) {
                stream.pause();
                console.log(`Inicio await Insercoes : ${insercoes.length}`);
                Promise.all(insercoes)
                  .catch((e) => console.log(`Erro salvando ${i} - ${e}`))
                  .then((x) => {
                    console.log(`Fim await Insercoes : ${insercoes.length}`);
                    insercoes.splice(0);
                    insercoes = [];
                    insercoes.length = 0;
                    stream.resume();
                  })
                  .catch((er) => {
                    console.log(`Erro de inserções ${er}`);
                    stream.resume();
                  });
              }
            })
            .on("end", async function () {
              if (insercoes.length > 0) {
                await Promise.all(insercoes);
                insercoes.splice(0);
                insercoes.length = 0;
              }
              console.log(`Arquivo finalizado : ${csvs[i]} : ${stats.size}`);
              resolve(true);
            })
            .on("error", function (error) {
              console.log(`Arquivo com erro : ${csvs[i]} : ${stats.size}`);
              console.log(error.message);
              reject(false);
            });
        }
      }
    });
  };
  download = (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      console.log(`Download start ${fileName} em ${this.tempFilePath}`);
      const readableStream = await fetch(fileName).then((r) =>
        stream.Readable.fromWeb(r.body)
      );
      const fileToWrite = fs.createWriteStream(this.tempFilePath);
      this.downloading = true;
      await readableStream.pipe(fileToWrite);
      fileToWrite
        .on("finish", async () => {
          fileToWrite.close();
          console.log("Download Completed");
          this.downloading = false;
          console.log("Will extract");
          await this.extract();
        })
        .on("error", function (error) {
          console.log(`Download error ${fileName} : ${error}`);
          console.log(error.message);
          reject(false);
        });
      resolve(true);
    });
  };
}
var p = new ProcessoDownloadClass();
p.download();
