const state = {
  Access: 'AccessKey',
  Secret: 'SecretKey'
}

const mutations = {
  save (state, data) {
    state.Access = data.Access
    state.Secret = data.Secret
    console.log('key.js')
  }
}

export default {
  state,
  mutations
}
