// import { PocketFactory } from "@components/base";
// import { IdentifiableBaseType, Identifier, IdentifierFormat } from "./identifier.types";



// class IdentityFactory
//     extends PocketFactory
//     <
//     >
// {



//     constructor() {
//         super(BaseTypes.PocketIdentity);
//     }

//     public static create({
//         format,
//         options = {
//             prefix: "",
//             suffix: ""
//         },
//         type = undefined
//     }: {
//         format?: IdentifierFormat,
//         options?: {
//             prefix?: string,
//             suffix?: string,
//             length?: number,
//             timestamp?: number,
//             seriesStart?: number,
//             seriesEnd?: number,
//             seriesStep?: number,
//         },
//         type?: IdentifiableBaseType
//     } = {}): {
//         id: Identifier,
//         type: IdentifiableBaseType
//     } {
//         const prefix = options?.prefix || "";
//         const suffix = options?.suffix || "";

//         let identifier = prefix

//         switch (format) {
//             case "UUID":
//                 identifier += IdentityFactory.generateUUIDv4();
//                 break;
//             case "SERIES":
//                 identifier += IdentityFactory.generateRandomString(options?.length);
//                 break;
//             case "Timestamp":
//                 identifier += IdentityFactory.generateISOTimestamp(options?.timestamp);
//                 break;
//             case "Name":
//                 // identifier += IdentityFactory.createName();
//                 break;
//             default:
//                 throw new Error(`Invalid identifier format: ${format}`);
//         }

//         identifier += suffix;

//         if (type === undefined) {
//             return {
//                 id: identifier,
//                 type: BaseTypes.Custom
//             };
//         }

//         return {
//             id: identifier,
//             type
//         };
//     }

//     private static generateUUIDv4(): string {
//         {
//             const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//                 const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//                 return v.toString(16);
//             });
        
//             // check the generated id format using regex
//             const idRegex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
//             if (!idRegex.test(id)) {
//                 return IdentityFactory.generateUUIDv4();
//             }
        
//             return id;
//         }
//     }

//     private static generateRandomString(length: number = 34): string {
//         return Math.random().toString(36).substring(2, length + 2);
//     }

//     private static generateISOTimestamp(timestamp: number = Date.now()): string {
//         return new Date(timestamp).toISOString();
//     }

//     private static formatIdentifier(identifier: string): string {
//         return identifier;
//     }

//     private static checkForUUID(identifier: string): boolean {
//         return identifier.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/) !== null;
//     }



// }


// export {
//     IdentityFactory,
// }

