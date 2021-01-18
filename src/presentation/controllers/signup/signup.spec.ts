/* eslint class-methods-use-this: "off" */
import { SignUpController } from './signup';
import { IUserModel } from '../../../domain/models/user';
import { IAddUser, IAddUserModel } from '../../../domain/use-cases/add-user';
import { MissingParamError } from '../error/missing-param-error';
import { InvalidParamError } from '../error/invalid-param-error';
import { IHttpRequest } from '../protocols';

const name = 'test user';
const email = 'test.user@email.com';
const password = 'password';
const hashedPassword = 'hashed.password';


class AddUserStub implements IAddUser {
  async add(userModel: IAddUserModel): Promise<IUserModel> {
    return {
      name,
      email,
      hashedPassword
    }
  }
}

const makeSut = () => {
  const addUser = new AddUserStub()
  const sut = new SignUpController(addUser)
  return { sut, addUser }
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
      }
    }

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
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'));
  });

  it('Should call AddUser with correct parameters', async () => {
    const { sut, addUser } = makeSut()
    const addSpy = jest.spyOn(addUser, 'add')

    const httpRequest: IHttpRequest = {
      body: {
        name, email, password, passwordConfirmation: password
      }
    }

    await sut.handle(httpRequest)
    expect(addSpy).toBeCalledWith({ name, email, password })
  });
});
