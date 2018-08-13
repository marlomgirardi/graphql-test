const fetch = require('node-fetch')
const { AuthenticationError, ApolloError } = require('apollo-server')

export default {
  newGist: (source, { input, token }, context, info) => {
    return fetch('https://api.github.com/gists', {
      method: 'POST',
      body: JSON.stringify({
        description: input.description,
        public: input.public,
        files: input.files.reduce((obj, file) => {
          obj[file.filename] = file
          return obj
        }, {})
      }),
      json: true,
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      return res
        .json()
        .then((body) => {
          if (!res.ok) {
            // TODO: Estudar melhor os erros
            if (res.status === 401 || res.status === 403) {
              throw new AuthenticationError(`GitHub - ${body.message}: ${body.documentation_url}`)
            }
            throw new ApolloError(`GitHub - ${body.message}: ${body.documentation_url}`, 'GITHUB_ERROR')
          }
          return body
        })
    })
  }
}
