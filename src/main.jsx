// import { StrictMode } from 'react'
import { CookiesProvider } from 'react-cookie'
import { createRoot } from 'react-dom/client'
import { VideoLibraryIndex } from './video-library/video-library-index'
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import { Provider } from 'react-redux'
import store from './store/store.jsx'

createRoot(document.getElementById('root')).render(
  <CookiesProvider>
      <Provider store={store}>
          <VideoLibraryIndex />
      </Provider>
  </CookiesProvider>
)
