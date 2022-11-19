const config = {
    // verbose: true,
    roots: ['<rootDir>/src'],
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    moduleNameMapper: {
        '^.+\\.(css|scss)$': 'babel-jest',
        '^~ui/(.*)': 'ui/$1',
        '^~components/(.*)': 'components/$1',
        '^~todo-context/(.*)': 'todo-context/$1',
    },
    testEnvironment: 'jsdom',
    modulePaths: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
};

module.exports = config;
