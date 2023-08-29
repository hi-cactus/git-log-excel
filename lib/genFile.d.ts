import { WorkSheet } from "node-xlsx";
export declare const ExcelHeader: string[];
export declare const genFile: (sheets: WorkSheet<unknown>[], filename: string, genPath?: string | null | undefined) => void;
