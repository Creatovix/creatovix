import { type SchemaTypeDefinition } from 'sanity'
import portfolio from './portfolio'
import team from './team'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolio, team],
}
