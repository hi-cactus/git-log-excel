import { ParsedArgs } from "minimist";
import util from "node:util";
import fs from "fs";
import chalk from "chalk";

const access = util.promisify(fs.access);

export const isEmail = (email: string) => {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
    email
  );
};

export const getEmail = (email?: string) => {
  if (email) {
    if (typeof email === "string" && isEmail(email)) {
      return email;
    } else
      console.log(
        chalk.yellow("Warning ") + " Please enter a valid e-mail! --- " + email,
        ". email argument has ignored!"
      );
  }
  return null;
};

export const getOverDate = (overDate?: string) => {
  if (overDate) {
    if (/^\d{2}\:\d{2}(\:\d{2})?$/.test(overDate)) return overDate;
    else
      console.log(
        chalk.yellow("Warning ") + " Please enter a valid time! ---" + overDate,
        ". over date has set to default value: 18:30:30 "
      );
  }
  return "18:30:00";
};

export const genPath = async (exportPath?: string) => {
  if (exportPath) {
    if (typeof exportPath === "string") {
      let fok = true;
      try {
        await access(exportPath, fs.constants.F_OK);
      } catch (error) {
        if (error) fok = false;
      }
      return fok ? exportPath : null;
    } else {
      console.log(
        chalk.yellow("Warning ") +
          " Please enter a valid path! " +
          ". Export Path has ignored!"
      );
    }
  }

  return null;
};
