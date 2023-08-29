import { getCommits } from "./getCommits";
import { ParsedArgs } from "minimist";
import { genPath, getEmail } from "./utils";
import { getBranch } from "./getBranch";
import { ExcelHeader, genFile } from "./genFile";
import { WorkSheet } from "node-xlsx";
import { getFileName } from "./getFileName";
import dayjs from "dayjs";

export const generateXlsx = async (args: ParsedArgs) => {
  try {
    const email = getEmail(args);

    const exportPath = await genPath(args);

    const branchList = await getBranch();

    if (!branchList) return;

    const draftDate = await Promise.allSettled(
      branchList.map((o) => getCommits(o, email))
    );

    const branchCommitList = draftDate.map((o, idx) => ({
      branch: branchList[idx],
      value: (o.status === "fulfilled" ? o.value : []).map((o) => [
        o.id,
        o.name,
        o.email,
        o.date,
        o.message,
        o.endDate,
      ]),
    }));

    const buffer = branchCommitList.map((o) => ({
      name: o.branch
        .replace("origin/", "")
        .replace(/\\|\/|\?|\*|\[|\]/g, "")
        .slice(0, 31),
      data: [ExcelHeader, ...o.value],
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
  }
};
