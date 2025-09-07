export const PROVIDER_LABELS = {
  github: 'Github',
  google: 'Google',
} as const

export const PROVIDERS = Object.keys(PROVIDER_LABELS) as (keyof typeof PROVIDER_LABELS)[]
