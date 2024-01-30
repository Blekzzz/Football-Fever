function errorHandler(err, res, res, next) {
    let status = 500
    let message = "Internal Server Error"

    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400
            message = err.errors[0].message
            break;
        case "NoEmail":
            status = 400
            message = "Email is required"
            break
        case "NoPassword":
            status = 400
            message = "Password is required"
            break
        case "NoUsername":
            status = 400
            message = "Username is required"
            break
        case "InvalidLogin":
            status = 401
            message = "Invalid username/password, please check your input"
            break;
        case "AuthenticationError":
        case "JsonWebTokenError":
            status = 401
            message = "Authentication Error"
            break;
        case "NotFound":
            status = 404
            message = "Data not found"
            break;
        case "NoMembership":
            status = 401
            message = "You must be a membership to continue"
            break;
        case "MembershipApplied":
            status =  400
            message = "You already subscribed"
            break;
    }

    console.log(err)
    res.status(status).json({ message })
}

module.exports = errorHandler