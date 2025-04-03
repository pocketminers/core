class PocketMessage {
  static getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }

  static getErrorStack(error: unknown): string | undefined {
    if (error instanceof Error) {
      return error.stack;
    }
    return undefined;
  }
}

export {
    PocketMessage
}