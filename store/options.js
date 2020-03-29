export const state = () => ({
    apiUrl: '',
    defaultUrl: 'http://127.0.0.1:5000/',

    selected: '0'
  })
  
export const mutations = {
  setUrl (state,url) {
    state.apiUrl = url
  }
}