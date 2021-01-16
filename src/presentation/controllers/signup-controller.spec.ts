/* eslint class-methods-use-this: "off" */
import { SignUpController } from './signup-controller';

const email = 'test.user@email.com';
const password = 'password';

describe('SignUp Controller', () => {
  it('Should return 400 when name is not provided', async () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        email,
        password,
        passwordConfirmation: password,
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
