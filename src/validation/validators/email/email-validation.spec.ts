import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/errors'

describe('EmailValidation', () => {
  test('SHould return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })
})
