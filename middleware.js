import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

const middleware = async (request)=>{
    const secret = await process.env.JWT_KEY

    try {
        
        const cookie = await request.cookies.get('jwt').value
        if(cookie == undefined){
            return NextResponse.redirect(new URL('/entrar', request.url))
        }
        await jwtVerify(`${cookie}`, new TextEncoder().encode(secret))
            
    } catch (error) {
        const url = request.nextUrl.clone()
        url.pathname = '/entrar'
        return NextResponse.redirect(new URL('/entrar', request.url))
    }

    

}

export default middleware

export const config = {
    matcher: '/gestor/:path*',
}