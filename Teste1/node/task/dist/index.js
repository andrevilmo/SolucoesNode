"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: ('.env') });
const config = require("config");
//process.env.NODE_ENV = config.get("environment.name");
process.env.NODE_OPTIONS = config.get("environment.options");
const fileName = config.get(process.env.NODE_ENV + ".fileToImport.url");
const toSave = config.get(process.env.NODE_ENV + ".fileToImport.saved");
const folderExtract = config.get(process.env.NODE_ENV + ".fileToImport.folderExtract");
const gunzip = require("gunzip-maybe");
const fs = require("fs");
const os = require("os");
const path = require("path");
const tar = require("tar-fs");
const { parse } = require("csv-parse");
const stream = require("stream");
const targz = require("tar.gz");
const models_1 = require("./models/models");
class ProcessoDownloadClass {
    constructor() {
        this.getFiles = (dir, files = []) => {
            const fileList = fs.readdirSync(dir);
            for (const file of fileList) {
                const name = `${dir}/${file}`;
                if (fs.statSync(name).isDirectory()) {
                    this.getFiles(name, files);
                }
                else {
                    if (name.toLocaleLowerCase().endsWith(".csv"))
                        files.push(name);
                }
            }
            return files;
        };
        this.extract = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _this = this;
                let pastaExtracao = `${this.tempPath}\\extraindo`;
                console.log(`Download Completed previuosly ${this.tempFilePath} em ${pastaExtracao}`);
                gunzip(this.tempFilePath, pastaExtracao);
                let csvs = this.getFiles(pastaExtracao);
                console.log(csvs);
                for (let i = 0; i < csvs.length; i++) {
                    var stats = fs.statSync(csvs[i]);
                    if (stats.size > 1024) {
                        console.log(`Arquivo a importar : ${csvs[i]} : ${stats.size}`);
                        let insercoes = [];
                        const stream = fs
                            .createReadStream(csvs[i])
                            .pipe(parse({ delimiter: ",", from_line: 2 }))
                            .on("data", function (row) {
                            return __awaiter(this, void 0, void 0, function* () {
                                let toInsert = new models_1.InsertData();
                                if (csvs[i].toLocaleLowerCase().endsWith(`customers.csv`))
                                    insercoes.push(toInsert.Insert(new models_1.Organizations(row)));
                                if (csvs[i].toLocaleLowerCase().endsWith(`organizations.csv`))
                                    insercoes.push(toInsert.Insert(new models_1.Organizations(row)));
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
                            });
                        })
                            .on("end", function () {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (insercoes.length > 0) {
                                    yield Promise.all(insercoes);
                                    insercoes.splice(0);
                                    insercoes.length = 0;
                                }
                                console.log(`Arquivo finalizado : ${csvs[i]} : ${stats.size}`);
                                resolve(true);
                            });
                        })
                            .on("error", function (error) {
                            console.log(`Arquivo com erro : ${csvs[i]} : ${stats.size}`);
                            console.log(error.message);
                            reject(false);
                        });
                    }
                }
            }));
        };
        this.download = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                console.log(`Download start ${fileName} em ${this.tempFilePath}`);
                const readableStream = yield fetch(fileName).then((r) => stream.Readable.fromWeb(r.body));
                const fileToWrite = fs.createWriteStream(this.tempFilePath);
                this.downloading = true;
                yield readableStream.pipe(fileToWrite);
                fileToWrite
                    .on("finish", () => __awaiter(this, void 0, void 0, function* () {
                    fileToWrite.close();
                    console.log("Download Completed");
                    this.downloading = false;
                    console.log("Will extract");
                    yield this.extract();
                }))
                    .on("error", function (error) {
                    console.log(`Download error ${fileName} : ${error}`);
                    console.log(error.message);
                    reject(false);
                });
                resolve(true);
            }));
        };
        this.tempPath = path.join(os.tmpdir(), folderExtract);
        this.tempFilePath = path.join(os.tmpdir(), toSave);
    }
}
var p = new ProcessoDownloadClass();
p.download();
