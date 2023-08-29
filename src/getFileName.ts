import path from "path";
import util from "node:util";
import fs from "fs";

const readFile = util.promisify(fs.readFile);
const access = util.promisify(fs.access);
export const getFileName = async () => {
  const pkgPath = path.resolve("./package.json");
  let fok = true;
  try {
    await access(pkgPath, fs.constants.F_OK);
  } catch (error) {
    if (error) fok = false;
  }

  const dirname = path.resolve().split("/").reverse()[0];

  if (fok) {
    try {
      const data = await readFile(pkgPath, "utf-8");
      const pkg = JSON.parse(data);

      return pkg!.name ?? dirname;
    } catch (error) {}
  }

  return dirname;
};
