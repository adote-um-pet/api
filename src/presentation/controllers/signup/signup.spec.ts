/* eslint class-methods-use-this: "off" */
import { SignUpController } from './signup';

const name = 'test user';
const email = 'test.user@email.com';
const password = 'password';

const makeSut = () => {
  const sut = new SignUpController()
  return { sut }
}

describe('SignUp Controller', () => {
  it('Should return 400 when name is not provided', async () => {
    const { sut } = makeSut()

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
    const { sut } = makeSut()

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

  it('Should return 400 when password is not provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name,
        email,
        passwordConfirmation: password,
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  it('Should return 400 when passwordConfirmation is not provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name,
        email,
        password,
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
