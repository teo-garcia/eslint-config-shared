import { add } from './math'
import { add as addAgain } from './math'

export const value = add(1, 2) + addAgain(3, 4)
