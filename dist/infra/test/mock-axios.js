import axios from 'axios';
import faker from 'faker';
export const mockAxios = () => {
    const mockedAxios = axios;
    mockedAxios.post.mockResolvedValue({
        data: faker.random.objectElement(),
        status: faker.datatype.number
    });
    return mockedAxios;
};
