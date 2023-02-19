const config = {
    // verbose: true,
    roots: ['<rootDir>/src'],
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    moduleNameMapper: {
        '^.+\\.(css|scss)$': 'babel-jest',
        '^~ui/(.*)': 'ui/$1',
        '^~components/(.*)': 'components/$1',
        '^~todo-context/(.*)': 'todo-context/$1',
        '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/mocks/fileMock.js',
        '\\.(css|less)$': '<rootDir>/mocks/fileMock.js',
    },
    testEnvironment: 'jsdom',
    modulePaths: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
};

module.exports = config;
