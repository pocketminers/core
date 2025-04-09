class Freezer {
    public static deepFreeze<T>(obj: T): T {
        Object.freeze(obj);
    
        Object.getOwnPropertyNames(obj).forEach((prop) => {
            const value = (obj as any)[prop];
            if (value && typeof value === "object" && !Object.isFrozen(value)) {
                Freezer.deepFreeze(value);
            }
        });
    
        return obj;
    }
}

export {
    Freezer
}