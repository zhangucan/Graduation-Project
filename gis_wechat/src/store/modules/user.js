import { login, logout, getInfo, getRSAkey } from '@/api/login'
import { getToken, setToken, removeToken, encrypt } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    role: '',
    gridLayouts: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, role) => {
      state.role = role
    },
    SET_GRID_LAYOUTS: (state, gridLayouts) => {
      state.gridLayouts = gridLayouts
    }
  },

  actions: {
    async Login({ commit }, userInfo) {
      const rsa = await getRSAkey()
      const password = encrypt(rsa.key, userInfo.password)
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_GRID_LAYOUTS', data.gridLayouts)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
