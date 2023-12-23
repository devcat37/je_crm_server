const ApiError = require('../error/api_error')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            'status': err.status,
            'message': err.message,
        })
    }

    console.log(err)
    return res.status(500).json({
        'status': 500,
        'message': 'Internal server error',
    })
}