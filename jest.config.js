module.exports = {
	testEnvironment: 'node',
	roots: ['<rootDir>/tests/'],
	coverageProvider: 'v8',
	testTimeout: 30000,
	transform: {
		'^.+\\.(t|j)s$': ['@swc/jest'],
	},
	slowTestThreshold: 10,
	clearMocks: true,
	bail: 10,
};