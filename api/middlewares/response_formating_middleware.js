
module.exports = function(err, req, res, next) {
    console.log(err)

    return res.status(200).json(
        {'data': res.json},
    )
}