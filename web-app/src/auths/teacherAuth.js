const teacherAuth = (userInfo) => {
    // console.log(userInfo);
    if (userInfo.userInfo._id && userInfo.userInfo.isTeacher === true ) {
        // console.log("It is a teacher!");
        return true;
    } else {
        return false;
    }
}

export default teacherAuth;