import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: {
    [process.env.NEXT_PUBLIC_SCHEMA_URL!]: {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      },
    },
  },
  documents: ['**/*.gql'],
  generates: {
    './feature/api/graphql/schema.ts': {
      plugins: ['typescript'],
    },
    './feature/api/graphql/operations.ts': {
      preset: 'import-types',
      plugins: ['typescript-operations'],
      presetConfig: {
        typesPath: './schema',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
