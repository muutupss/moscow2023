export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        console.log({ 'Authorization': user.token }, 'in authHeader')
        return { 'Authorization': user.token };
    } else {
        return {};
    }
}

export function isUserInSystemLocalStorage() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return true
    } else {
        return false;
    }
}

export function isAdminInSystemLocalStorage() {
    let admin = JSON.parse(localStorage.getItem('admin'));

    if (admin) {
        return true
    } else {
        return false;
    }
}