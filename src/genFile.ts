import xlsx, { WorkSheet } from "node-xlsx";
import fs from "fs";
import path from "path";

export const ExcelHeader = [
  "Commit ID",
  "Author name",
  "Author email",
  "Submit date",
  "Submit information",
  "Out of 18:30",
];
export const genFile = (
  sheets: WorkSheet<unknown>[],
  filename: string,
  genPath: string | null | undefined = ""
) => {
  const buffer = xlsx.build(sheets, {
    sheetOptions: {},
  });

  fs.writeFile(
    path.resolve(genPath || "", `${filename}.xlsx`),
    buffer,
    (err) => {
      if (err) {
        console.log("generate .xlsx failed \n", err);
        return;
      }
      console.log("generate successfully \n");
      console.log("commit log excel path: \n");

      console.log(path.resolve(genPath || "", `${filename}.xlsx`));
    }
  );
};
