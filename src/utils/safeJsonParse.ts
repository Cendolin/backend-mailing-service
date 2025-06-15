export const safeJsonParse = <T>(data: string): T | undefined => {
    try {
        return JSON.parse(data);
    } catch {
        return undefined;
    }
}