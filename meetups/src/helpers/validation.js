export function isEmpty(val) {
    return val.trim().length === 0
}

export function isValidEmail(val){
    let regex = new RegExp('[a-z\d]+@[a-z]+\.[a-z]{2,3}')
    return  regex.test(val)
}