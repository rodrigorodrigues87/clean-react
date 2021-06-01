import faker from 'faker';
export const mockAuthentication = () => ({
    email: faker.internet.email(),
    pasword: faker.internet.password()
});
export const mockAccountModel = () => ({
    accessToken: faker.datatype.uuid()
});
