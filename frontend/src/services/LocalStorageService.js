export const storeToken=(value)=>{
    const {access,refresh}=value;
    localStorage.setItem('accessToken',access)
    localStorage.setItem('refreshToken',refresh)
}

export const getToken=()=>{
    let accessToken=localStorage.getItem('accessToken')
    let refreshToken=localStorage.getItem('refreshToken')
    return {accessToken,refreshToken}
}

export const removeToken=()=>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}

