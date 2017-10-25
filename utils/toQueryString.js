let toQueryString = obj => {
    let result = '';
    for(let key in obj){
        result += `${key}=${obj[key]}&`;
    }
    result = result.slice(0, result.length - 1);
    return result;
}