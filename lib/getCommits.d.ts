export interface Commit {
    id: string;
    name: string;
    email: string;
    date: string;
    message: string;
    endDate: string | number;
}
export declare const getCommits: (branch?: string, email?: string | null | undefined) => Promise<Commit[]>;
