import '@testing-library/jest-dom/extend-expect';
import 'jest-localstorage-mock';

global.console = {
    ...console,
    // uncomment to ignore a specific log level
    // log: jest.fn(),
    // debug: jest.fn(),
    // info: jest.fn(),
    warn: jest.fn(),
    // error: jest.fn(),
};
