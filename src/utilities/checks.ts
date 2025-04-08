class Checks {

    public static isEmpty(value: any): boolean {
        return value === null
            || value === undefined
            || value === ""
            || value === " "
            || (Array.isArray(value) && value.length === 0);
    }
}

export {
    Checks
}