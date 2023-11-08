import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

declare module 'express' {
  export interface Request extends ExpressRequest {
    myCustomProperty?: string
  }

  export interface Response extends ExpressResponse {
    myCustomMethod?: () => void
  }
}
