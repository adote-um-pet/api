import { IController, IHttpRequest, IHttpResponse } from './protocols'

export class SignUpController implements IController {
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return {
      statusCode: 400,
    };
  }
}
