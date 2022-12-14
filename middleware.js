import { jwtVerify } from 'jose'

const middleware = async (request)=>{
    const secret = await process.env.JWT_KEY

    const url = request.url
    
    if(url.includes('/gestor')){

        const cookie = await request.cookies.get('jwt').value
        if(cookie == undefined){
            return NextResponse.redirect(new URL('/entrar', request.url))
        }
        try {
            const teste = await jwtVerify(`${cookie}`, new TextEncoder().encode(secret))
              
        } catch (error) {
            const url = request.nextUrl.clone()
            url.pathname = '/entrar'
            return NextResponse.redirect(new URL('/entrar', request.url))
        }

    }

}

export default middleware

export const config = {
    matcher: '/gestor',
}