/* eslint class-methods-use-this: "off" */
import { SignUpController } from './signup';
import { MissingParamError } from '../error/missing-param-error';

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
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
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
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
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
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
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
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
  });

  it('Should return 400 when password and passwordConfirmation are different', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name,
        email,
        password,
        passwordConfirmation: `different.${password}`
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
