import nookies from 'nookies'

const APIRequestAuth = async (url, type, body) =>{
    const cookies = nookies.get()
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`,{
        method: type,
        body: JSON.stringify(body) ,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `bearer ${cookies.jwt}`
        } 
    }).then( resp => resp.json().then( data => ({status: resp.status, body: data}) ))
}

export default APIRequestAuth