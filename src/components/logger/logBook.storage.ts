// import { BaseStorageItem } from "@templates/v0/base/storage";
import { LogBookItemEntry } from "@components/logger/logger.types";
import { BaseMetadata } from "@templates/v0/base/metadata";


// class LogBookItem
//     implements
//         BaseStorageItem<LogBookItemEntry>
// {
//     public name: string;
//     public description?: string;
//     public type: keyof LogBookItemEntry;
//     public size: number;
//     public value: LogBookItemEntry;
//     public metadata?: BaseMetadata;

//     constructor({
//         name,
//         description,
//         type,
//         size,
//         value,
//         metadata
//     }: {
//         name: string;
//         description?: string;
//         type: keyof LogBookItemEntry;
//         size: number;
//         value: LogBookItemEntry;
//         metadata?: BaseMetadata;
//     }) {
//         this.name = name;
//         this.description = description;
//         this.type = type;
//         this.size = size;
//         this.value = value;
//         this.metadata = metadata;
//     }
// }