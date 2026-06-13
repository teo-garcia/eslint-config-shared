import process from 'node:process'

export const port = Number(process.env.PORT ?? 3000)
