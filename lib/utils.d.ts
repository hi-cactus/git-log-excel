import { ParsedArgs } from "minimist";
export declare const isEmail: (email: string) => boolean;
export declare const getEmail: (args: ParsedArgs) => string | null;
export declare const genPath: (args: ParsedArgs) => Promise<string | null>;
