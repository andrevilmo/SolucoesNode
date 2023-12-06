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
exports.Organizations = exports.Customers = exports.InsertData = void 0;
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);
class InsertData {
    constructor() {
        this.tableName = "None";
        this.Insert = (dataToInsert) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let typeToInsert = dataToInsert.constructor.name;
                knex(typeToInsert)
                    .insert(dataToInsert)
                    .then((id) => {
                    console.error(`Inserting ${typeToInsert}: ${JSON.stringify(dataToInsert)}`);
                    resolve(true);
                })
                    .catch((err) => {
                    console.error(err);
                    reject(false);
                    return {
                        success: false,
                        message: `An error occurred, please try again later. Inserting  ${dataToInsert}`,
                    };
                });
            }));
        };
    }
}
exports.InsertData = InsertData;
class Customers {
    constructor(v) {
        this.id = v[0];
        this.name = v[1];
        this.created_at = v[2];
        this.updated_at = v[3];
        this.Index = v[4];
        this["Customer Id"] = v[5];
        this["First Name"] = v[6];
        this["Last Name"] = v[7];
        this.Company = v[8];
        this.City = v[9];
        this.Country = v[10];
        this["Phone 1"] = v[11];
        this["Phone 2"] = v[12];
        this.Email = v[13];
        this.Subscription = v[14];
        this.Date = v[15];
        this.Website = v[16];
    }
}
exports.Customers = Customers;
class Organizations {
    constructor(v) {
        this.Index = v[0];
        this["Organization Id"] = v[1];
        this.Name = v[2];
        this.Website = v[3];
        this.Country = v[4];
        this.Description = v[5];
        this.Founde = v[6];
        this.Industry = v[7];
        this["Number of employees"] = v[8];
    }
}
exports.Organizations = Organizations;
exports.default = { Customers: Customers, Organizations: Organizations, InsertData: InsertData };
