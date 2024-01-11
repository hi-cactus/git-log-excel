import fs from "fs";
import path from "path";
import util from "node:util";

const readFile = util.promisify(fs.readFile);

export const getFileName = async (repo?: string) => {
  const dirname = path.posix
    .resolve()
    .replace(/\\/g, "/")
    .split("/")
    .reverse()[0];

  if (repo) {
    return (
      repo.match(/\/(\w|\-)+\.git/g)?.[0]?.replace(/\/|\.git/g, "") || dirname
    );
  }

  const pkgPath = path.resolve("./package.json");

  try {
    const data = await readFile(pkgPath, "utf-8");
    const pkg = JSON.parse(data);

    return `${dirname}___${pkg!.name ?? ""}`;
  } catch (error) {
    return dirname;
  }
};
