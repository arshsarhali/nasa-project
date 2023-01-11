const request = require('supertest')
const app = require('../src/app')
const { mongoConnect, mongoDisconnect } = require('../src/services/mongo')

const { loadPlanetsData } = require('../src/models/planets.model')

describe('Launches API', () => {
	beforeAll(async () => {
		await mongoConnect()
		await loadPlanetsData()
	})

	afterAll(async () => {
		await mongoDisconnect()
	})

	describe('Test GET /launches', () => {
		test('It should respond with 200 success', async () => {
			const response = await request(app)
				.get('/launches')
				.expect('Content-Type', /json/)
				.expect(200)
		})
	})
	describe('Test POST /launch', () => {
		const launchData = {
			mission: 'Test mission',
			rocket: 'test rocket',
			target: 'Kepler-442 b',
			launchDate: 'January 20, 2025',
		}

		const launchDataNoDate = {
			mission: 'Test mission',
			rocket: 'test rocket',
			target: 'Kepler-442 b',
		}

		const launchDataInvalidDate = {
			mission: 'Test mission',
			rocket: 'test rocket',
			target: 'Kepler-442 b',
			launchDate: 'Sand',
		}

		test('It should respond with 201 created', async () => {
			const response = await request(app)
				.post('/launches')
				.send(launchData)
				.expect('Content-Type', /json/)
				.expect(201)

			const requestDate = new Date(launchData.launchDate).valueOf()
			const responseDate = new Date(response.body.launchDate).valueOf()

			expect(responseDate).toBe(requestDate)

			expect(response.body).toMatchObject(launchDataNoDate)
		})
		test('It should catch missing required properties', async () => {
			const response = await request(app)
				.post('/launches')
				.send(launchDataNoDate)
				.expect('Content-Type', /json/)
				.expect(400)

			expect(response.body).toStrictEqual({
				error: 'Missing required property',
			})
		})
		test('It should catch invalid dates', async () => {
			const response = await request(app)
				.post('/launches')
				.send(launchDataInvalidDate)
				.expect('Content-Type', /json/)
				.expect(400)

			expect(response.body).toStrictEqual({
				error: 'Inavlid Launch Date',
			})
		})
	})
})
