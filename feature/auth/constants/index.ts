export const PROVIDER_LABELS = {
  google: 'Google',
  github: 'Github',
} as const

export const PROVIDERS = Object.keys(PROVIDER_LABELS) as (keyof typeof PROVIDER_LABELS)[]
