import { ParameterFactory } from "@components/config/parameter.factory";
import { BaseIdentifierFormats, BaseParameterEntry } from "@templates/v0";
import { BaseObjectTypes } from "@templates/v0/base/object";
import { Parameter } from "@components/config/parameter";
import { Metadata } from "@components/base/metadata";

describe("ParameterFactory", () => {
    describe("checkParameterEntry", () => {
        it("should throw an error if entry is null or undefined", () => {
            expect(() => ParameterFactory["checkParameterEntry"](null as any)).toThrow("Entry is required");
            expect(() => ParameterFactory["checkParameterEntry"](undefined as any)).toThrow("Entry is required");
        });

        it("should throw an error if entry.name is not provided", () => {
            const entry = { required: true } as BaseParameterEntry<any>;
            expect(() => ParameterFactory["checkParameterEntry"](entry)).toThrow("Name is required");
        });

        it("should set entry.required to false if it is undefined", () => {
            const entry = { name: "test" } as BaseParameterEntry<any>;
            const result = ParameterFactory["checkParameterEntry"](entry);
            expect(result.required).toBe(false);
        });

        it("should return the entry if it is valid", () => {
            const entry = { name: "test", required: true } as BaseParameterEntry<any>;
            const result = ParameterFactory["checkParameterEntry"](entry);
            expect(result).toEqual(entry);
        });
    });

    describe("fromRecord", () => {
        it("should create a Parameter instance with valid entry and meta", () => {
            const entry: BaseParameterEntry<string> = {
                name: "test",
                description: "A test parameter",
                default: "defaultValue",
                required: true,
                optional: [],
            };
            const meta: Metadata<BaseIdentifierFormats.Number, BaseObjectTypes.Parameter> = new Metadata({
                id: { value: 1, format: BaseIdentifierFormats.Number },
                type: BaseObjectTypes.Parameter,
                name: "testMeta",
                description: "Meta description",
            });

            const parameter = ParameterFactory.fromRecord(entry, meta);

            expect(parameter).toBeInstanceOf(Parameter);
            expect(parameter.name).toBe(entry.name);
            expect(parameter.description).toBe(entry.description);
            expect(parameter.default).toBe(entry.default);
            expect(parameter.required).toBe(entry.required);
            expect(parameter.optional).toBe(entry.optional);
            expect(parameter.metadata).toBeDefined();
        });

        it("should create a Parameter instance with valid entry and no meta", () => {
            const entry: BaseParameterEntry<string> = {
                name: "test",
                description: "A test parameter",
                default: "defaultValue",
                required: true,
                optional: [],
            };

            const parameter = ParameterFactory.fromRecord(entry);

            expect(parameter).toBeInstanceOf(Parameter);
            expect(parameter.name).toBe(entry.name);
            expect(parameter.description).toBe(entry.description);
            expect(parameter.default).toBe(entry.default);
            expect(parameter.required).toBe(entry.required);
            expect(parameter.optional).toBe(entry.optional);
            expect(parameter.metadata).toBeDefined();
        });

        it("should throw an error if entry is invalid", () => {
            const entry = { description: "Invalid entry" } as BaseParameterEntry<any>;
            expect(() => ParameterFactory.fromRecord(entry)).toThrow("Name is required");
        });
    });
});