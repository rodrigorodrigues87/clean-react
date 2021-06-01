import faker from 'faker';
export const mockPostRequest = () => ({
    url: faker.internet.url(),
    body: faker.random.objectElement()
});
