export default class Logger {
    private static _logs: string[] = [];

    static get logs(): string[] {
        return [...this._logs];
    }

    static log(message: string) {
        if(process.env.NODE_ENV === "test") {
            return;
        }

        this._logs.push(message);
    }
}