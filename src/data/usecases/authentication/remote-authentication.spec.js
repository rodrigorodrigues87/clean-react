var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import faker from 'faker';
import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http';
import { mockAuthentication, mockAccountModel } from '@/domain/test';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
const makeSut = (url = faker.internet.url()) => {
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    return {
        sut,
        httpPostClientSpy
    };
};
describe('RemoteAuthentication', () => {
    test('Should call HttpPostClient with correct URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const url = faker.internet.url();
        const { sut, httpPostClientSpy } = makeSut(url);
        yield sut.auth(mockAuthentication());
        expect(httpPostClientSpy.url).toBe(url);
    }));
    test('Should call HttpPostClient with correct body', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, httpPostClientSpy } = makeSut();
        const authenticationParams = mockAuthentication();
        yield sut.auth(authenticationParams);
        expect(httpPostClientSpy.body).toEqual(authenticationParams);
    }));
    test('Should throw InvalidCredentialsError HttpPostClient returns 401', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, httpPostClientSpy } = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unauthorized
        };
        const promise = sut.auth(mockAuthentication());
        yield expect(promise).rejects.toThrow(new InvalidCredentialsError());
    }));
    test('Should throw UnexpectedError HttpPostClient returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, httpPostClientSpy } = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        };
        const promise = sut.auth(mockAuthentication());
        yield expect(promise).rejects.toThrow(new UnexpectedError());
    }));
    test('Should throw UnexpectedError HttpPostClient returns 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, httpPostClientSpy } = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        };
        const promise = sut.auth(mockAuthentication());
        yield expect(promise).rejects.toThrow(new UnexpectedError());
    }));
    test('Should throw UnexpectedError HttpPostClient returns 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, httpPostClientSpy } = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        };
        const promise = sut.auth(mockAuthentication());
        yield expect(promise).rejects.toThrow(new UnexpectedError());
    }));
    test('Should return an AccountModel if HttpPostClient returns 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, httpPostClientSpy } = makeSut();
        const httpResult = mockAccountModel();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: httpResult
        };
        const account = yield sut.auth(mockAuthentication());
        expect(account).toEqual(httpResult);
    }));
});
