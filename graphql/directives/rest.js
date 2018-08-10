import { SchemaDirectiveVisitor } from 'apollo-server'
import fetch from 'node-fetch'

const convertObjectToArray = (object) => Object.getOwnPropertyNames(object).map(prop => object[prop])


export default class RestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { url, type } = this.args;
    field.resolve = (source, { login }, context, info) => {
      let customUrl = url
      if (login) {
          customUrl += `/${login}`
      }

      const re = /{[a-zA-Z0-9-_.]+}/g

      let result
      while (result = re.exec(url)) {
        const found = result[0]
        const param = found.replace(/{|}/g, '')
        const value = source[param]

        if (typeof value === "undefined") {
          throw new Error('Invalid param ' + param)
        }

        customUrl = customUrl.replace(found, value)
      }

      return fetch(customUrl)
        .then(r => {
          if (r.status !== 200) {
            throw new Error(`API status ${r.status} ${r.statusText}`)
          }
          return r.json()
        })
        .then((result) => {
          switch (type) {
            case 'gists': {
              return result
                .map((gist) => {
                  gist.files = convertObjectToArray(gist.files)
                  return gist
                })
            }
          }
          return result
        })
    };
  }
}

