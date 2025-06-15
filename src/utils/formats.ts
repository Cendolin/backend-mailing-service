export const formatMessageByKeys = (message: string, keys: Record<string, string>): string => {
    return Object.entries(keys).reduce((formattedMessage, [key, value]) => {
        const regex = new RegExp(`{${key}}`, 'g');
        return formattedMessage.replace(regex, value);
    }, message);
}
