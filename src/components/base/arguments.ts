// import { PocketArgument, PocketArgumentEntry, PocketArgumentOptions } from "@components/base/argument";
// import { BaseArguments, BaseValueKey } from "@templates/v0";


// /**
//  * PocketArgumentsOptions is an interface that defines the options for PocketArguments.
//  */
// interface PocketArgumentsOptions
//     extends
//         Record<'allowDuplicates', boolean>,
//         Record<'freeze', boolean> {}
// {}


// /**
//  * PocketArguments is a class that extends Array and implements the PocketArguments interface.
//  * It is used to manage a collection of PocketArgument objects.
//  */
// class PocketArguments
//     extends
//         Array<PocketArgument>
//     implements
//         BaseArguments<any>
// {
//     public static readonly defaultOptions: PocketArgumentsOptions = {
//         allowDuplicates: false,
//         freeze: false
//     };

//     public readonly configuration: PocketArgumentsOptions;

//     public constructor(
//         configuration: PocketArgumentsOptions = {
//             allowDuplicates: false,
//             freeze: true
//         },
//         ...args: PocketArgumentEntry[]
//     ) {
//         super(...args.map((arg) => new PocketArgument(arg)));
//         this.configuration = {
//             ...PocketArguments.defaultOptions,
//             ...configuration
//         };

//         Object.setPrototypeOf(this, PocketArguments.prototype);
//         Object.freeze(this);
//     }

//     public checkForDuplicate({
//         name
//     }: {
//         name: BaseValueKey
//     }): boolean {
//         return this.some((arg) => arg.name === name);
//     }

//     public addArgument<T>(
//         arg: PocketArgumentEntry
//     ): PocketArguments {
//         if (this.configuration.allowDuplicates === false && this.checkForDuplicate({ name: arg.name })) {
//             throw new Error(`Argument with name ${String(arg.name)} already exists.`);
//         }
        
//         const newArg = new PocketArgument<T>(arg);
//         this.push(newArg);
//         return this;
//     }

//     public removeArgument(
//         arg: PocketArgumentEntry
//     ): PocketArguments {
//         if (this.configuration.allowDuplicates === false && !this.checkForDuplicate({ name: arg.name })) {
//             throw new Error(`Argument with name ${String(arg.name)} does not exist.`);
//         }

//         let argsRemoved: PocketArguments = new PocketArguments({configuration: {}});
//         if (this.configuration.allowDuplicates === true) {
//             for ( const argument of this) {
//                 if (argument.name === arg.name) {
//                     const index = this.indexOf(argument);
//                     this.splice(index, 1);
//                     argsRemoved.addArgument(argument);
//                 }
//             }
//             throw new Error(`Argument with name ${String(arg.name)} not found.`);
//         }

//         return this;
//     }   


// }


// export {
//     PocketArguments
// }