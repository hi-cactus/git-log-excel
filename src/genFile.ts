import xlsx, { WorkSheet } from "node-xlsx";
import path from "path";
import fs from "fs";

import util from "node:util";

const writeFile = util.promisify(fs.writeFile);

export const ExcelHeader = [
  "Commit ID",
  "Author name",
  "Author email",
  "Commit date",
  "Commit message",
];
export const genFile = async (
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
        { wch: 40 },
        { wch: 20 },
      ],
    },
  });

  const excelPath = path.normalize(
    path.resolve(genPath || "", `${filename}.xlsx`)
  );

  await writeFile(excelPath, buffer);
};
