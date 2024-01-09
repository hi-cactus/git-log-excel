import ora from "ora";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { BranchSummary, simpleGit } from "simple-git";
import { WorkSheet } from "node-xlsx";
import { getFileName } from "./getFileName";
import { ExcelHeader, genFile } from "./genFile";
import { genPath, getEmail, getOverDate } from "./utils";
import fs from "fs";
import path from "path";
import util from "node:util";

const mkdir = util.promisify(fs.mkdir);
const rm = util.promisify(fs.rm);

dayjs.extend(duration);

interface Params {
  email?: string;
  exportPath?: string;
  overDate?: string;
  overDateName?: string;
  repo?: string;
  branch?: string;
}

const spinner = ora({
  text: "Starting...",
  spinner: "bouncingBar",
});

export const generateXlsx = async ({
  email: e,
  exportPath: p,
  overDate: o,
  overDateName = "Hours over 18:30",
  branch,
  repo,
}: Params) => {
  const tempDirPath = `temp_repo_for_xlsx_${dayjs().format("YYYYMMDDHHmmss")}`;

  try {
    spinner.start();

    const git = simpleGit();

    spinner.text = "Getting branches...";

    let branchSummary: BranchSummary;
    if (repo) {
      await mkdir(tempDirPath, { recursive: true });

      branchSummary = await git
        .cwd(tempDirPath)
        .init()
        .addRemote("origin", repo)
        .fetch()
        .branch(["-r"]);
    } else {
      branchSummary = await git.branch(["-r"]);
    }

    const email = getEmail(e);

    if (e && !email) {
      spinner.warn(`${e} is not a valid email. email has be ignored`);
    }

    const overDate = getOverDate(o);

    const exportPath = await genPath(p);

    if (!branchSummary.all.length) {
      spinner.fail("No branches found");
      return;
    }

    if (branch && !branchSummary.all.includes(branch)) {
      spinner.fail(`Branch ${branch} not found`);
      return;
    }

    const branchList = branch
      ? branchSummary.all.filter((b) => b.includes(branch))
      : branchSummary.all;

    if (branchList.length === 0 && branch) spinner.text = "Getting commits...";

    const defaultLogOption = [`--no-merges`];

    const logResultSettled = await Promise.allSettled(
      branchList.map(
        async (b) =>
          await git.log(
            [
              `${b}`,
              ...defaultLogOption,
              email ? `--author=${email}` : "",
            ].filter((o) => o)
          )
      )
    );

    const branchCommitList = logResultSettled.map((o, idx) => ({
      branch: branchList[idx],
      value: (o.status === "fulfilled" ? o.value.all : []).map((o) => {
        const formatDate = dayjs(o.date);

        const startDate = dayjs(
          `${formatDate.year()}-${
            formatDate.month() + 1
          }-${formatDate.date()} ${overDate}`
        );

        const diff = dayjs
          .duration(formatDate.diff(startDate))
          .as("hours")
          .toFixed(2);

        //TODO 若当天有多次提及记录, 则只显示最后一条over date记录,
        //当天小计, 与当前branch 汇总
        //
        return [
          o.hash,
          o.author_name,
          o.author_email,
          formatDate.format("YYYY-MM-DD HH:mm:ss"),
          o.message,
          Number(diff ?? 0) > 0 ? diff : "",
        ];
      }),
    }));

    const sheetNames = branchCommitList.map((o) =>
      o.branch
        .replace("origin/", "")
        .replace(/\\|\/|\?|\*|\[|\]/g, "")
        .slice(-31)
    );

    spinner.text = "Generating...";

    const buffer = branchCommitList.map((o, idx) => ({
      name: sheetNames[idx],
      data: [[...ExcelHeader, overDateName], ...o.value],
      options: {} as WorkSheet["options"],
    }));

    const filename =
      (await getFileName()) +
      "___" +
      dayjs().format("YYYY-MM-DD") +
      "___" +
      Date.now();

    await genFile(buffer, filename, exportPath);

    spinner.succeed("Generate excel successfully.");
    spinner.succeed(
      "Excel path: " +
        path.normalize(path.resolve(exportPath || "", `${filename}.xlsx`))
    );
  } catch (error) {
    if (error instanceof Error) {
      spinner.fail(error.message);
    }
  } finally {
    spinner.stop();
    if (repo) {
      rm(tempDirPath, { recursive: true });
    }
  }
};
