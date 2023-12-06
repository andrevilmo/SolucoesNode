const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV]);
export interface IInsertData {
}
export class InsertData {
  
  tableName: string = "None";
  Insert = (dataToInsert: IInsertData): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      let typeToInsert = dataToInsert.constructor.name;
      knex(typeToInsert)
        .insert(dataToInsert)
        .then((id) => {
          console.error(
            `Inserting ${typeToInsert}: ${JSON.stringify(
              dataToInsert
            )}`
          );
          resolve(true);
        })
        .catch((err) => {
          console.error(err);
          reject(false);
          return {
            success: false,
            message:
              `An error occurred, please try again later. Inserting  ${dataToInsert}`,
          };
        });
    });
  };
}
export class Customers implements IInsertData  {
  constructor(v: any[]) {
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
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  Index: number;
  "Customer Id": string;
  "First Name": string;
  "Last Name": string;
  Company: string;
  City: string;
  Country: string;
  "Phone 1": string;
  "Phone 2": string;
  Email: string;
  Subscription: string;
  Date: string;
  Website: string;
}
export class Organizations implements IInsertData  {
  Index: number;
  "Organization Id": string;
  Name: string;
  Website: string;
  Country: string;
  Description: string;
  Founde: string;
  Industry: string;
  "Number of employees": number;
  constructor(v: any[]) {
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
  static tableName: string;
}
export default { Customers: Customers, Organizations: Organizations, InsertData: InsertData };
