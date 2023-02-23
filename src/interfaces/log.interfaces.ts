export interface LogInterface {
    user_id: string;
    title: string;
    type?: "todo" | "event" | "note";
    completed?: boolean;
    migrated?: boolean;
    scheduled?: boolean;
}
