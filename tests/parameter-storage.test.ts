import { ParameterStorage } from "../src/components/config/parameter.storage";
import { Parameter } from "../src/components/config/parameter";
import { BaseStorageLocations } from "@templates/v0/base/storage";
import { Metadata } from "@components/metadata";
import { BaseIdentifierTypes, BaseObjectTypes } from "@templates/v0";

describe("ParameterStorage", () => {
    let storage: ParameterStorage;

    beforeEach(() => {
        storage = new ParameterStorage({
            location: BaseStorageLocations.MEMORY,
            allowDuplicates: false,
            allowEmpty: false,
            maxSize: 5,
        });
    });

    it("should initialize with default values", () => {
        expect(storage.getLocation()).toBe(BaseStorageLocations.MEMORY);
        expect(storage.getSize()).toBe(0);
        expect(storage.allowDuplicates).toBe(false);
        expect(storage.allowEmpty).toBe(false);
        expect(storage.maxSize).toBe(5);
    });

    it("should add a parameter to the storage", () => {
        const parameter = new Parameter({
            name: "param1",
            description: "Test parameter",
            default: "defaultValue",
            required: true,
            optional: ["opt1", "opt2"],
            meta: new Metadata<BaseIdentifierTypes.Number, BaseObjectTypes.Parameter>({ id: { value: 1, type_: BaseIdentifierTypes.Number } })
        });
        storage.addItem(parameter);
        expect(storage.getSize()).toBe(1);
        expect(storage.getItem({ value: 1, type_: BaseIdentifierTypes.Number })).toEqual(parameter);
    });

    it("should throw an error when adding a duplicate parameter", () => {
        const parameter = new Parameter({
            name: "param1",
            description: "Test parameter",
            default: "defaultValue",
            required: true,
            optional: ["opt1", "opt2"],
            meta: new Metadata<BaseIdentifierTypes.Number, BaseObjectTypes.Parameter>({ id: { value: 1, type_: BaseIdentifierTypes.Number } })
        });
        storage.addItem(parameter);
        expect(() => storage.addItem(parameter)).toThrow("Item already exists");
    });

    it("should throw an error when storage is full", () => {
        for (let i = 0; i < 5; i++) {
            const parameter = new Parameter({
                name: `param${i}`,
                description: "Test parameter",
                default: "defaultValue",
                required: true,
                optional: [],
                meta: new Metadata<BaseIdentifierTypes.Number, BaseObjectTypes.Parameter>({ id: { value: 1, type_: BaseIdentifierTypes.Number } })
            });
            storage.addItem(parameter);
        }
        const parameter = new Parameter({
            name: "param6",
            description: "Test parameter",
            default: "defaultValue",
            required: true,
            optional: [],
            meta: new Metadata<BaseIdentifierTypes.Number, BaseObjectTypes.Parameter>({ id: { value: 6, type_: BaseIdentifierTypes.Number } })
        });
        expect(() => storage.addItem(parameter)).toThrow("PocketStorage is full");
    });

    it("should remove a parameter from the storage", () => {
        const parameter = new Parameter({
            name: "param1",
            description: "Test parameter",
            default: "defaultValue",
            required: true,
            optional: [],
            meta: new Metadata<BaseIdentifierTypes.Number, BaseObjectTypes.Parameter>({ id: { value: 1, type_: BaseIdentifierTypes.Number } })
        });
        storage.addItem(parameter);
        storage.removeItem({ value: 1, type_: BaseIdentifierTypes.Number });
        expect(storage.getSize()).toBe(0);
        expect(storage.getItem({ value: 1, type_: BaseIdentifierTypes.Number })).toBeUndefined();
    });

    it("should throw an error when removing a non-existent parameter", () => {
        expect(() => storage.removeItem({ value: 1, type_: BaseIdentifierTypes.Number })).toThrow("Item not found");
    });

    it("should clear the storage", () => {
        const parameter1 = new Parameter({
            name: "param1",
            description: "Test parameter",
            default: "defaultValue",
            required: true,
            optional: [],
            meta: new Metadata<BaseIdentifierTypes.Number, BaseObjectTypes.Parameter>({ id: { value: 1, type_: BaseIdentifierTypes.Number } })
        });
        const parameter2 = new Parameter({
            name: "param2",
            description: "Test parameter",
            default: "defaultValue",
            required: true,
            optional: [],
            meta: new Metadata<BaseIdentifierTypes.Number, BaseObjectTypes.Parameter>({ id: { value: 2, type_: BaseIdentifierTypes.Number } })
        });
        storage.addItem(parameter1);
        storage.addItem(parameter2);
        storage.clear();
        expect(storage.getSize()).toBe(0);
    });
});
