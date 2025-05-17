class PocketServiceCommand {
  constructor(
    public name: string,
    public description: string,
    public args: string[],
    public options: string[],
    public defaultArgs: string[],
    public defaultOptions: string[]
  ) {}
}


export {
    PocketServiceCommand
}