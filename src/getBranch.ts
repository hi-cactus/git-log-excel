import util from "node:util";
import cp from "node:child_process";

const exec = util.promisify(cp.exec);

export const getBranch = async (): Promise<string[] | undefined> => {
  try {
    const { stderr, stdout } = await exec(`git branch -r`);

    if (stderr) {
      console.log(stderr);
      return;
    }

    const list = stdout
      .split("\n")
      .map((o) => o.trim().replace("origin/HEAD -> ", ""))
      .filter((o) => !!o);

    return Array.from(new Set(list));
  } catch (error) {
    console.log(error);
    return;
  }
};
