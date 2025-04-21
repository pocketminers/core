import { Properties } from "@components/config/properties.storage";
import { Argument, Parameter } from "@components/config";
import { BaseStorageLocations } from "@templates/v0/base/storage";
import { BaseObjectTypes } from "@templates/v0/base/object";
import { BaseValueKey } from "@templates/v0/base/value";
import { Metadata } from "@components/metadata";
import { MultiHashUtilities } from "@utilities/multiHash";import { BaseIdentifierTypes } from "index";
4

describe("Properties", () => {
    let properties: Properties;

    beforeEach(() => {
        properties = new Properties();
    });

    test("should create an instance of Properties", () => {
        expect(properties).toBeInstanceOf(Properties);
    });

    test("should have default values", () => {
        expect(properties.location).toBe(BaseStorageLocations.MEMORY);
        expect(properties.allowDuplicates).toBe(true);
        expect(properties.allowEmpty).toBe(true);
        expect(properties.maxSize).toBe(0);
    });

    test("should add an argument to the storage", async () => {
        const arg = new Argument({
            name: "testArg",
            value: "testValue"
        });

        console.log(JSON.stringify(arg.metadata, null, 2));
        console.log(JSON.stringify(await arg.toHashedIdentifier(), null, 2));
        console.log(await MultiHashUtilities.generateMultihash(arg.dataString));
        properties.addItem(arg);

        expect(properties.items).toContain(arg);
        console.log(JSON.stringify(properties.items, null, 2));
        expect(properties.items.length).toBe(1);
        expect(properties.items[0]).toBe(arg);
    });

    test("should add a parameter to the storage", async () => {
        const param = new Parameter<string, 'Name'>({
            name: "testParam",
            description: "Test parameter",
            default: "testValue",
            required: true,
            optional: ['testOptionalVAlue'],
            meta: new Metadata<'Name', BaseObjectTypes.Parameter>({
                name: "testParam",
                id: { value: "testParamId", type_: "Name" },
                description: "Test parameter metadata description",
                tags: ["test"]
            }),
        });

        console.log(JSON.stringify(param.metadata, null, 2));
        console.log(JSON.stringify(await param.toMultiHashIdentifier(), null, 2));

        properties.addItem(param);

        expect(properties.items).toContain(param);
        expect(properties.items.length).toBe(1);
        expect(properties.items[0]).toBe(param);
    });

    test("should throw an error when adding a duplicate argument", () => {
        const arg = new Argument({
            name: "testArg",
            value: "testValue"
        });

        properties.addItem(arg);
        properties.addItem(arg);

        expect(properties.items.length).toBe(2);
        
    });
});