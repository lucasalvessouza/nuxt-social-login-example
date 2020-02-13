const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  authUser: null
})

export const mutations = {
  setUser (state, user) {
    state.authUser = user
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit, dispatch }, { req }) {
    if (req.headers.cookie && req.path !== '/login') {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        const vuexState = JSON.parse(parsed.socialLoginExample)
        commit('setUser', vuexState.authUser)
      } catch (err) {
        // No valid cookie found
      }
    } else {
      dispatch('logout')
    }
  },
  login ({ commit }, { user }) {
    try {
      // const { data } = await axios.post('/api/login', { username, password })
      commit('setUser', user)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  logout ({ commit }) {
    commit('setUser', null)
  }

}
