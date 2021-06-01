var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HttpStatusCode } from '@/data/protocols/http';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
export class RemoteAuthentication {
    constructor(url, httpPostClient) {
        this.url = url;
        this.httpPostClient = httpPostClient;
    }
    auth(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const httpResponse = yield this.httpPostClient.post({
                url: this.url,
                body: params
            });
            switch (httpResponse.statusCode) {
                case HttpStatusCode.ok: return httpResponse.body;
                case HttpStatusCode.unauthorized: throw new InvalidCredentialsError();
                default: throw new UnexpectedError();
            }
        });
    }
}
