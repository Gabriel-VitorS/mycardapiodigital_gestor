const APIRequest = async (url, type, body) =>{
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`,{
        method: type,
        body: JSON.stringify(body) ,
        headers:{
            'Content-Type': 'application/json'
        } 
    }).then( resp => resp.json().then( data => ({status: resp.status, body: data}) ))
    .catch((err)=> console.log(err))
}

export default APIRequest