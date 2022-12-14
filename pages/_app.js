import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import MainContainer from '../Components/MainContainer/MainContainer'
import { useRouter } from 'next/router'
function MyApp({ Component, pageProps }) {
  const router = useRouter()

  if(router.pathname.includes('/gestor')){
    
      return(
        <MainContainer>
          <Component {...pageProps} />  
        </MainContainer>)
    
  }else{
    return  <Component {...pageProps} />  
  }
}

export default MyApp
