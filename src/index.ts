import { getCommits } from "./getCommits";
import { genPath, getEmail, getOverDate } from "./utils";
import { getBranch } from "./getBranch";
import { ExcelHeader, genFile } from "./genFile";
import { WorkSheet } from "node-xlsx";
import { getFileName } from "./getFileName";
import dayjs from "dayjs";

interface Params {
  email?: string;
  exportPath?: string;
  overDate?: string;
  overDateName?: string;
}

export const generateXlsx = async ({
  email: e,
  exportPath: p,
  overDate: o,
  overDateName = "Hours over 18:30",
}: Params) => {
  try {
    const email = getEmail(e);
    const overDate = getOverDate(o);

    const exportPath = await genPath(p);

    const branchList = await getBranch();

    if (!branchList) return;

    const draftDate = await Promise.allSettled(
      branchList.map((o) => getCommits(o, email, overDate))
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
  }
};
