import { ParsedArgs } from "minimist";
import util from "node:util";
import fs from "fs";

const readFile = util.promisify(fs.readFile);
const access = util.promisify(fs.access);

export const isEmail = (email: string) => {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
    email
  );
};

export const getEmail = (args: ParsedArgs) => {
  if (args.email) {
    if (typeof args.email === "string" && isEmail(args.email)) {
      console.log("commit author email " + args.email);
      return args.email;
    } else
      console.log(
        "Please enter a valid e-mail! ---" + args.email,
        ". Email has ignored!"
      );
  }
  return null;
};

export const genPath = async (args: ParsedArgs) => {
  if (args.exportPath) {
    if (typeof args.exportPath === "string") {
      let fok = true;
      try {
        await access(args.exportPath, fs.constants.F_OK);
      } catch (error) {
        if (error) fok = false;
      }
      return fok ? args.exportPath : null;
    } else {
      console.log("Please enter a valid path! " + ". Export Path has ignored!");
    }
  }

  return null;
};
