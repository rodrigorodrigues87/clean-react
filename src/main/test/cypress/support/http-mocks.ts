import { Method } from 'axios'
import faker from 'faker'

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    statusCode: 401,
    body: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockUnexpectedError = (url: RegExp, method: Method): void => {
  cy.intercept(method, url, {
    statusCode: 400,
    body: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockOk = (url: RegExp, method: Method, body: any): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    body
  }).as('request')
}
