import nookies from 'nookies'

const APIRequestAuthFile = async (url, type, FormData) =>{
    const cookies = nookies.get()
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`,{
        method: type,
        body: FormData,
        headers:{
            'Authorization': `bearer ${cookies.jwt}`
        } 
    }).then( resp => resp.json().then( data => ({status: resp.status, body: data}) ))
}

export default APIRequestAuthFile