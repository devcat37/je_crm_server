
module.exports = function(err, req, res, next) {
    res.body = {
        'data': res.body,
    }

    return res.json(res.body)
}