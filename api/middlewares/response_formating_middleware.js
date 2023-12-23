
module.exports = function(err, req, res, next) {
    if(err) {
        return next(err);
    }

    // Format response.
    res.body = {
        'data': res.body,
    }

    return res.json(res.body)
}