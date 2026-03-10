declare module '*.gql' {
  import { DocumentNode } from '@apollo/client'

  const value: DocumentNode
  export = value
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}
