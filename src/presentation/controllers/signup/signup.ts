import { IController, IHttpRequest, IHttpResponse } from '../protocols'
import { badRequest } from '../../helpers/http-response'
import { MissingParamError } from '../error/missing-param-error'
import { InvalidParamError } from '../error/invalid-param-error'

export class SignUpController implements IController {
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const requiredParams = ['name', 'email', 'password', 'passwordConfirmation']
    for (const param of requiredParams) {
      if (!httpRequest.body[param]) {
        return badRequest(new MissingParamError(param))
      }
    }

    const { password, passwordConfirmation } = httpRequest.body;
    if (password !== passwordConfirmation) {
      return badRequest(new InvalidParamError("passwordConfirmation"))
    }

    return {
      statusCode: 200
    }
  }
}
