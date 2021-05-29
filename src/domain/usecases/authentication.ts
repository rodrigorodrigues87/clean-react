import { AccountModel } from '../models/account-model'

type AuthenticationParams = {
  email: string
  pasword: string
}

export interface Authentication {
  auth(params: AuthenticationParams): Promise<AccountModel>
}
