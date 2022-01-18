import { SuveryModel } from '@/domain/models'

export interface LoadSuveryList {
  loadAll: () => Promise<SuveryModel[]>
}
