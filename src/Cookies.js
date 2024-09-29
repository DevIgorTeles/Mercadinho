import Cookies from 'js-cookie'
export const Bolacha ={
    get:(key)=>{
        return Cookies.get(key)
    },
    insert:(key,value) =>{
        Cookies.set(key,value)
    },
    delete: (key) =>{
        Cookies.remove(key)

    }
}