import { readFile } from "fs/promises";
import path from "path";

export const getFileName = async () => {
  const pkgPath = path.resolve("./package.json");

  const dirname = path.posix
    .resolve()
    .replace(/\\/g, "/")
    .split("/")
    .reverse()[0];

  try {
    const data = await readFile(pkgPath, "utf-8");
    const pkg = JSON.parse(data);

    return `${dirname}___${pkg!.name ?? ""}`;
  } catch (error) {
    console.log(error);
    
    return dirname;
  }
};
