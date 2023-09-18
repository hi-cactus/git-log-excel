import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import util from "node:util";
import cp from "node:child_process";

const exec = util.promisify(cp.exec);

dayjs.extend(duration);

export interface Commit {
  id: string;
  name: string;
  email: string;
  date: string;
  message: string;
  endDate: string | number;
}

export const getCommits = async (
  branch = "",
  email: string | null | undefined = "",
  overDate = "18:30:00"
) => {
  try {
    const { stdout, stderr } = await exec(`git log ${branch}`);

    if (stderr) {
      console.log(stderr);
      return [];
    }
    const commits = stdout
      ?.split(/(?=(commit [A-Za-z0-9]{40}))/g)
      ?.map((o) => o.trim())
      ?.filter((o) => !!o)
      .map((o) =>
        o
          .split("\n")
          .map((o) => o.trim())
          .filter((o) => !!o)
      );

    return commits
      ?.reduce((c, n) => {
        if (n.length < 2) return c;

        const [id, author, date, ...msgs] = n;

        // ignore merge log
        if (author.includes("Merge:")) return c;

        const draftDate = date?.replace("Date: ", "")?.trim() ?? "";
        const formatDate = dayjs(draftDate);

        let end = -1;

        if (draftDate) {
          const startDate = dayjs(
            `${formatDate.year()}-${
              formatDate.month() + 1
            }-${formatDate.date()} ${overDate}`
          );

          end = dayjs.duration(formatDate.diff(startDate)).as("hours");
        }

        //TODO 若当天有多次提及记录, 则只显示最后一条over date记录,
        //当天小计, 与当前branch 汇总
        // 

        return [
          ...c,
          {
            id: id.replace("commit ", ""),
            name: author?.split(" <")?.[0]?.replace("Author: ", "") ?? "",
            email: author?.split(" <")?.[1]?.replace(">", "") ?? "",
            message: msgs?.join(),
            date: draftDate && formatDate.format("YYYY-MM-DD HH:mm:ss"),
            endDate: end < 0 ? "" : end?.toFixed(2) ?? "",
          },
        ];
      }, [] as Commit[])
      .filter((o) => (email ? o.email === email : true));
  } catch (error) {
    console.log(error);

    return [];
  }
};
