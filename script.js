function getData(profileName){
    return fetch('https://api.github.com/users/${profileName}')
}