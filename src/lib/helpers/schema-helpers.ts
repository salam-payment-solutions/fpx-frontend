// schema-helpers.ts
import { z } from 'zod'

export const zBoolean = () =>
    z.preprocess((val) => {
        console.log('Processing boolean:', val)
        return val === 'true' || val === true ? true : false
    }, z.boolean())
