import { IController, IHttpRequest, IHttpResponse } from '../protocols'
import { IAddUser } from '../../../domain/use-cases/add-user';
import { badRequest } from '../../helpers/http-response'
import { MissingParamError } from '../error/missing-param-error'
import { InvalidParamError } from '../error/invalid-param-error'

export class SignUpController implements IController {
  private readonly addUser: IAddUser

  constructor(addUser: IAddUser) {
    this.addUser = addUser
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const requiredParams = ['name', 'email', 'password', 'passwordConfirmation']
    for (const param of requiredParams) {
      if (!httpRequest.body[param]) {
        return badRequest(new MissingParamError(param))
      }
    }
    
    const { name, email, password, passwordConfirmation } = httpRequest.body;
    if (password !== passwordConfirmation) {
      return badRequest(new InvalidParamError("passwordConfirmation"))
    }
    
    await this.addUser.add({ name, email, password })

    return {
      statusCode: 200
    }
  }
}
