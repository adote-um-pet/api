/* eslint class-methods-use-this: "off" */
import { SignUpController } from './signup';

const name = 'test user';
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

  it('Should return 400 when email is not provided', async () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        name,
        password,
        passwordConfirmation: password,
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
