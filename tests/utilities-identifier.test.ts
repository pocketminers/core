import { IdentifierUtilities } from "@utilities/identifier";


describe('IdentifierUtilities', () => {
    describe('generateIdentifier', () => {
        it('should generateIdentifier an identifier with default options', () => {
            const result = IdentifierUtilities.generateIdentifier();
            console.log(result);
            expect(result).toHaveProperty('value');
            expect(result).toHaveProperty('format');
        });

        it('should generateIdentifier an identifier with custom prefix and suffix', () => {
            const result = IdentifierUtilities.generateIdentifier({
                format: 'UUID',
                options: {
                    prefix: 'prefix_',
                    suffix: '_suffix'
                }
            });
            expect(result.value).toMatch(/^prefix_.+_suffix$/);
        });

        it('should throw an error for invalid format', () => {
            try {
                IdentifierUtilities.generateIdentifier({
                    format: 'INVALID_FORMAT' as any
                });
            }
            catch (e: any) {
                expect(e).toBeInstanceOf(Error);
                expect(e.message).toBe('Invalid identifier format: INVALID_FORMAT');
            }
        });

        it('should generateIdentifier an identifier with UUID format', () => {
            const result = IdentifierUtilities.generateIdentifier({
                format: 'UUID'
            });
            expect(result.value).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        });

        it('should generateIdentifier an identifier with Name format', () => {
            const result = IdentifierUtilities.generateIdentifier({
                format: 'Name',
                options: {
                    length: 10
                }
            });
            console.log(result);
            expect(result.value).toHaveLength(10);
        });

        it('should generateIdentifier an identifier with Name format and prefix', () => {
            const result = IdentifierUtilities.generateIdentifier({
                format: 'Name',
                options: {
                    prefix: 'prefix_',
                    length: 10
                }
            });
            expect(result.value).toMatch(/^prefix_.{10}$/);
        });

        it('should generateIdentifier an identifier with Number format', () => {
            const result = IdentifierUtilities.generateIdentifier({
                format: 'Number',
                options: {
                    length: 5
                }
            });
            expect(result.value).toHaveLength(5);
            expect(Number(result.value)).toBeGreaterThanOrEqual(0);
        });
    });
});