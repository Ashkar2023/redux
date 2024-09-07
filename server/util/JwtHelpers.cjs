const { sign, verify, TokenExpiredError, decode } = require("jsonwebtoken");

exports.signJWT = (payload, validity) => new Promise((resolve, reject) => {
    sign(
        payload,
        process.env.JSON_WEB_TOKEN_SECRET,
        {
            algorithm: "HS256",
            expiresIn: validity
        },
        (err, token) => {
            if (err) {
                console.log(err.message);
                reject(err)
            } else {
                resolve(token)
            }
        });
});

exports.verifyJWT = (token) => new Promise((resolve, reject) => {
    verify(token,
        process.env.JSON_WEB_TOKEN_SECRET,
        { algorithms: ["HS256"]},
        (err, isVerified) => {
            if (err) {
                if (err instanceof TokenExpiredError) {
                    reject(new Error("Token expired"));
                } else {
                    reject(err);
                }
            } else {
                resolve(isVerified);
            }
        }
    );
});

exports.decodeJWT = (token) => new Promise((resolve, reject) => {
    decode(token, (err, decodedToken) => {
        if (err) {
            reject(err);
        } else {
            resolve(decodedToken);
        }
    });

})
