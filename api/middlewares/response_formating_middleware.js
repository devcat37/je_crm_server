
module.exports = function(req, res, next) {
    // Format response.
    res.body = {
        'data': res.body,
    }

    return res.json(res.body)
}