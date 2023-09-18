import xlsx, { WorkSheet } from "node-xlsx";
import fs from "fs";
import path from "path";
import chalk from "chalk";

export const ExcelHeader = [
  "Commit ID",
  "Author name",
  "Author email",
  "Submit date",
  "Submit information",
];
export const genFile = (
  sheets: WorkSheet<unknown>[],
  filename: string,
  genPath: string | null | undefined = ""
) => {
  const buffer = xlsx.build(sheets, {
    sheetOptions: {
      "!cols": [
        { wch: 40 },
        { wch: 20 },
        { wch: 30 },
        { wch: 20 },
        { wch: 20 },
      ],
    },
  });

  const excelPath = path.normalize(
    path.resolve(genPath || "", `${filename}.xlsx`)
  );

  fs.writeFile(excelPath, buffer, (err) => {
    if (err) {
      console.log(chalk.red("generate .xlsx failed \n"), err);
      return;
    }
    console.log(chalk.green("\nglog: generate excel successfully \n"));
    console.log(chalk.green("commit log excel path:"));
    console.log(chalk.green(excelPath));
    console.log("\n");
  });
};
