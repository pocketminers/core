import { BaseServiceResponse } from "@templates/v0/base/service";
import { BaseServerErrorCodes, BaseSuccessCodes } from "@templates/v0/base/statuses";

describe('BaseServiceResponse', () => {
    it('should create a valid BaseServiceResponse object', () => {
        const response: BaseServiceResponse<BaseSuccessCodes.ACCEPTED, string> = {
            code: BaseSuccessCodes.ACCEPTED,
            data: "Success",
        };

        expect(response.code).toBe(202);
        expect(response.data).toBe("Success");
    });

    it('should allow an optional error property', () => {
        const response: BaseServiceResponse<BaseServerErrorCodes.INTERNAL_SERVER_ERROR, string, Error> = {
            code: BaseServerErrorCodes.INTERNAL_SERVER_ERROR,
            data: "Internal Server Error",
            error: new Error("Something went wrong"),
        };

        expect(response.code).toBe(500);
        expect(response.data).toBe("Internal Server Error");
        expect(response.error).toBeInstanceOf(Error);
    });

    it('should have matching types for code and data', () => {

        try {

            const response: BaseServiceResponse<BaseSuccessCodes.OK, {
                message: string;
                notes: string;
            }> = {
                code: BaseSuccessCodes.OK,
                // @ts-ignore
                data: "OK",
            };
        } catch (error: any) {
            expect(error.message).toBe("Type 'string' is not assignable to type '{ message: string; notes: string; }'.");
        }
    });

    it('should allow for different types of data', () => {
        const response: BaseServiceResponse<BaseSuccessCodes.OK, { message: string; notes: string }> = {
            code: BaseSuccessCodes.OK,
            data: {
                message: "Success",
                notes: "No issues",
            },
        };

        expect(response.code).toBe(200);
        expect(response.data.message).toBe("Success");
        expect(response.data.notes).toBe("No issues");
    });

    it('should allow for different types of error', () => {
        const response: BaseServiceResponse<BaseServerErrorCodes.INTERNAL_SERVER_ERROR, string, TypeError> = {
            code: BaseServerErrorCodes.INTERNAL_SERVER_ERROR,
            data: "Internal Server Error",
            error: new TypeError("Type error occurred"),
        };

        expect(response.code).toBe(500);
        expect(response.data).toBe("Internal Server Error");
        expect(response.error).toBeInstanceOf(TypeError);
    });

    it('should allow for undefined error', () => {
        const response: BaseServiceResponse<BaseServerErrorCodes.INTERNAL_SERVER_ERROR, string, undefined> = {
            code: BaseServerErrorCodes.INTERNAL_SERVER_ERROR,
            data: "Internal Server Error",
            error: undefined,
        };

        expect(response.code).toBe(500);
        expect(response.data).toBe("Internal Server Error");
        expect(response.error).toBeUndefined();
    });
});