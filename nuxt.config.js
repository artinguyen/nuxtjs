export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css' }
    ],
     script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/jquery@3.6.3/dist/jquery.slim.min.js'
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js'
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js'
      }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyBh2DwRsqKF6eZcNzuL9qQUaBEdgFpcL9Q",
          authDomain: "smooth-verve-245207.firebaseapp.com",
          projectId: "smooth-verve-245207",
          storageBucket: "smooth-verve-245207.appspot.com",
          messagingSenderId: "216250815087",
          appId: "1:216250815087:web:458b5105165ef7c67c339a",
          measurementId: "G-5D815ZW3TL"
        },
        services: {
          auth: {
          persistence: 'local', // default
          initialize: {
            onAuthStateChangedAction: 'users/onAuthStateChangedAction',
            subscribeManually: false
          },
        ssr: true
        }, // Just as example. Can be any other service.
          firestore: true
        }
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  router: {
    middleware : 'auth'
  }
}
