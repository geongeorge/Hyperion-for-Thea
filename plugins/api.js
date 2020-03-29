import Vue from 'vue'

Vue.mixin({
  methods: {
    getUrl (url) {
      console
      if(this.$store.state.options.apiUrl == "") {
        this.$store.commit("options/setUrl",this.$store.state.options.defaultUrl)
        return this.$store.state.options.defaultUrl + url
      }
      //return default
        return this.$store.state.options.apiUrl + url
    }
  }
})