import { Server, Response } from 'miragejs'
import token from './token.json'

export function makeServer({ environment = 'development' } = {}) {

  let server = new Server({
    environment,

    routes() {

      this.namespace = 'api'

      this.post('/user/login', schema => {
        return new Response(200, {}, token)
      })

      this.post('/plans', (schema, request) => {
        const headers = {}
        const plan = JSON.parse(request.requestBody)
        return new Response(
          200,
          headers,
          { message: `Successfully subscribed to ${plan.name} plan`}
        )
      }, { timing: 2000 })
    },
  })

  return server
}