var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AxiosHttpClient } from './axios-http-client';
import { mockAxios } from '@/infra/test';
import { mockPostRequest } from '@/data/test';
jest.mock('axios');
const makeSut = () => {
    const sut = new AxiosHttpClient();
    const mockedAxios = mockAxios();
    return {
        sut,
        mockedAxios
    };
};
describe('AxiosHttpClient', () => {
    test('Should call axios with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = mockPostRequest();
        const { sut, mockedAxios } = makeSut();
        yield sut.post(request);
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    }));
    test('Should return the correct statusCode and body', () => {
        const { sut, mockedAxios } = makeSut();
        const promise = sut.post(mockPostRequest());
        expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
});
