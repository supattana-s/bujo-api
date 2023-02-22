export interface LogInterface {
    title: string;
    type: "todo" | "event" | "note";
    completed: boolean;
    migrated: boolean;
    scheduled: boolean;
}
