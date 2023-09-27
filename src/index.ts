import ora from "ora";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { simpleGit } from "simple-git";
import { WorkSheet } from "node-xlsx";
import { getFileName } from "./getFileName";
import { ExcelHeader, genFile } from "./genFile";
import { genPath, getEmail, getOverDate } from "./utils";

dayjs.extend(duration);

interface Params {
  email?: string;
  exportPath?: string;
  overDate?: string;
  overDateName?: string;
}

const spinner = ora({
  text: "Generating...",
  spinner: "bouncingBar",
});

export const generateXlsx = async ({
  email: e,
  exportPath: p,
  overDate: o,
  overDateName = "Hours over 18:30",
}: Params) => {
  try {
    spinner.start();
    const email = getEmail(e);
    const overDate = getOverDate(o);

    const exportPath = await genPath(p);

    const git = simpleGit();

    const branchSummary = await git.branch(["-r"]);

    const defaultLogOption = [`--no-merges`];

    const logResultSettled = await Promise.allSettled(
      branchSummary.all.map(
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
      branch: branchSummary.all[idx],
      value: (o.status === "fulfilled" ? o.value.all : []).map((o) => {
        const formatDate = dayjs(o.date);

        const startDate = dayjs(
          `${formatDate.year()}-${
            formatDate.month() + 1
          }-${formatDate.date()} ${overDate}`
        );

        //TODO 若当天有多次提及记录, 则只显示最后一条over date记录,
        //当天小计, 与当前branch 汇总
        //
        return [
          o.hash,
          o.author_name,
          o.author_email,
          o.date,
          o.message,
          dayjs.duration(formatDate.diff(startDate)).as("hours").toFixed(2),
        ];
      }),
    }));

    const buffer = branchCommitList.map((o) => ({
      name: o.branch
        .replace("origin/", "")
        .replace(/\\|\/|\?|\*|\[|\]/g, "")
        .slice(0, 31),
      data: [[...ExcelHeader, overDateName], ...o.value],
      options: {} as WorkSheet["options"],
    }));

    const filename = await getFileName();

    genFile(
      buffer,
      filename + "___" + dayjs().format("YYYY-MM-DD"),
      exportPath
    );
  } catch (error) {
    console.log(error);
  } finally {
    spinner.stop();
  }
};
