import { IController, IHttpRequest, IHttpResponse } from '../protocols'
import { badRequest } from '../../helpers/http-response'

export class SignUpController implements IController {
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return badRequest(new Error())
  }
}
