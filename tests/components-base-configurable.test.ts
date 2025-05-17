import {
    Configurable,
    ConfigurableOptions,
} from '@components/base/configurable';

describe('Configurable', () => {
    let configurable: Configurable;

    beforeEach(() => {
        configurable = new Configurable();
    });

    it('should initialize with default options', () => {
        expect(configurable.getOptions()).toEqual({});
    });

    it('should add an option', () => {
        const key = 'testKey';
        const value = { test: 'value' };
        configurable.addOption(key, value);
        expect(configurable.getOption(key)).toEqual(value);
    });

    it('should get an option', () => {
        const key = 'testKey';
        const value = { test: 'value' };
        configurable.addOption(key, value);
        expect(configurable.getOption(key)).toEqual(value);
    });

    it('should set options', () => {
        const options: ConfigurableOptions = {
            testKey1: { test: 'value1' },
            testKey2: { test: 'value2' },
        };
        configurable.setOptions(options);
        expect(configurable.getOptions()).toEqual(options);
    });

    it('should remove an option', () => {
        const key = 'testKey';
        const value = { test: 'value' };
        configurable.addOption(key, value);
        configurable.removeOption(key);
        expect(configurable.hasOption(key)).toBe(false);
    });

    it('should check if an option exists', () => {
        const key = 'testKey';
        const value = { test: 'value' };
        configurable.addOption(key, value);
        expect(configurable.hasOption(key)).toBe(true);
    });

    it('should clear all options', () => {
        const key1 = 'testKey1';
        const key2 = 'testKey2';
        const value1 = { test: 'value1' };
        const value2 = { test: 'value2' };
        configurable.addOption(key1, value1);
        configurable.addOption(key2, value2);
        configurable.clearOptions();
        expect(configurable.isEmpty()).toBe(true);
    });

    it('should convert to JSON string', () => {
        const key = 'testKey';
        const value = { test: 'value' };
        configurable.addOption(key, value);
        expect(configurable.toJSON()).toEqual(JSON.stringify({ [key]: value }));
    });

    it('should convert to string', () => {
        const key = 'testKey';
        const value = { test: 'value' };
        configurable.addOption(key, value);
        expect(configurable.toString()).toEqual(
            JSON.stringify({ [key]: value }, null, 2)
        );
    });

    it('should check if options are empty', () => {
        expect(configurable.isEmpty()).toBe(true);
        configurable.addOption('testKey', { test: 'value' });
        expect(configurable.isEmpty()).toBe(false);
    });
});