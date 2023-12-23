
module.exports = function(err, req, res, next) {
    console.log(err)

    // Format response.
    res.body = {
        'data': res.body,
    }

    return res.json(res.body)
}