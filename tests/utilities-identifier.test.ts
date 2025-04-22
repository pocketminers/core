import { IdentifierUtilities } from "@utilities/identifier";


describe('IdentifierUtilities', () => {
    describe('create', () => {
        it('should create an identifier with default options', () => {
            const result = IdentifierUtilities.create();
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('format');
        });

        it('should create an identifier with custom prefix and suffix', () => {
            const result = IdentifierUtilities.create({
                options: {
                    prefix: 'prefix_',
                    suffix: '_suffix'
                }
            });
            expect(result.id).toMatch(/^prefix_.+_suffix$/);
        });

        it('should throw an error for invalid format', () => {
            try {
                IdentifierUtilities.create({
                    format: 'INVALID_FORMAT' as any
                });
            }
            catch (e: any) {
                expect(e).toBeInstanceOf(Error);
                expect(e.message).toBe('Invalid identifier format: INVALID_FORMAT');
            }
        });

        it('should create an identifier with UUID format', () => {
            const result = IdentifierUtilities.create({
                format: 'UUID'
            });
            expect(result.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        });
    });
});