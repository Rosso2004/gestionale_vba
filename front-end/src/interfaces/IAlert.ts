export interface IAlert {
    open: boolean;
    type: "info" | "success" | "warning" | "error";
    text: string;
}