import { badRequest } from './http-response'
import { IHttpResponse } from '../controllers/protocols'

describe('Http Response Bad Request', () => {
  it('Should return statusCode 400', async () => {
    const response: IHttpResponse = badRequest(new Error('Bad Request Error'))
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Bad Request Error'))
  })
})