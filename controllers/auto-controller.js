const Auto = require('../models/autoTest-model')

create = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a test',
        })
    }

    const auto = new Auto(body)

    if (!auto) {
        return res.status(400).json({ success: false, error: err })
    }

    auto
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: auto._id,
                message: 'Test saved!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Test not saved!',
            })
        })
}

getAutoById = async (req, res) => {
    await Auto.findOne({ _id: req.params.id }, (err, auto) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!auto) {
            return res
                .status(404)
                .json({ success: false, error: `Automation not found` })
        }
        return res.status(200).json({ success: true, data: auto })
    }).catch(err => console.log(err))
}

list = async (req, res) => {
    await Auto.find({}, (err, autos) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!autos.length) {
            return res
                .status(404)
                .json({ success: false, error: `Autos not found` })
        }
        return res.status(200).json({ success: true, data: autos })
    }).catch(err => console.log(err))
}

uploadFile = async (req, res) => {
    if (req.files.screenshot.size === 0) {
        return res.status(400).send('Screenshot not uploaded.');
    }

    let file = req.files.screenshot

    file.mv('/home/wagner/tmp/teste.jpg', function(err) {
        if(err)
            return res.status(500).send(err);

        res.status(200).json({ success: true })
    })
}

module.exports = {
    create,
    list,
    uploadFile,
    getAutoById,
}