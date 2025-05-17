import {
    getLibp2pListenAddressParameters,
    generateListenAddresses,
} from '@peer/libp2p/addresses';

describe('getLibp2pListenAddressParameters', () => {
    it('should return an array of PocketParameter objects', () => {
        const result = getLibp2pListenAddressParameters();
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
        result.forEach((param) => {
            expect(param).toHaveProperty('name');
            expect(param).toHaveProperty('key');
            expect(param).toHaveProperty('description');
            expect(param).toHaveProperty('default');
            expect(param).toHaveProperty('required');
        });

        console.log(result);
    });
});

// describe("generateListenAddresses", () => {
//     it("should generate a valid array of listen addresses", () => {
//         const addresses = generateListenAddresses();
//         expect(addresses).toBeInstanceOf(Object);
//         expect(addresses.listen.length).toBeGreaterThan(0);
//         console.log(addresses);
//     });

// });

