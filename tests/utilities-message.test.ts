import { PocketMessage } from '../src/utilities/message';

describe('PocketMessage', () => {

    describe('getErrorMessage', () => {
        it('should return the error message if the error is an instance of Error', () => {
            const error = new Error('Test error');
            const result = PocketMessage.getErrorMessage(error);
            expect(result).toBe('Test error');
        });

        it('should return the string representation of the error if it is not an instance of Error', () => {
            const error = { message: 'Test error' };
            const result = PocketMessage.getErrorMessage(error);
            expect(result).toBe('[object Object]');
        });
    });

    describe('getErrorStack', () => {
        it('should return the error stack if the error is an instance of Error', () => {
            const error = new Error('Test error');
            const result = PocketMessage.getErrorStack(error);
            expect(result).toBe(error.stack);
        });

        it('should return undefined if the error is not an instance of Error', () => {
            const error = { message: 'Test error' };
            const result = PocketMessage.getErrorStack(error);
            expect(result).toBeUndefined();
        });
    });
});