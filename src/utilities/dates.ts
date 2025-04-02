class DateUtilities {
    public static getCurrentFullDateString(): string {
        return new Date().toISOString();
    }
}

export {
    DateUtilities
}