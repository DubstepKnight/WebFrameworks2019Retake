const commonAuth = (userInfo) => {
    console.log(userInfo);
    if (userInfo.userInfo) {
        console.log("id is here!");
        return true;
    } else {
        return false;
    }
}

export default commonAuth