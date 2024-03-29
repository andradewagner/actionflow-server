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

update = async (req, res) => {
    await Auto.findByIdAndUpdate(req.params.id,  req.body , (err, auto) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!auto) {
            return res
                .status(404)
                .json({ success: false, error: `Automation not found`})
        }

        hook(res, auto);

        return res.status(200).json({ success: true, data: auto })
    }).catch(err => console.log(err))
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

        hook(res, auto);

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

    /* file.mv('/home/wagner/tmp/teste.jpg', function(err) {
        if(err)
            return res.status(500).send(err);

        res.status(200).json({ success: true })
    }) */
    console.log(req);
    res.status(200).json({ req });
}

hook = (res, auto) => {
    let interval;
    res.io.on('connection', (socket) => {
        console.log("Nova conexao de " + auto.id);
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => getApiAndEmit(socket), 1000);
        socket.on("disconnect", () => {
            console.log("desconectado de " + auto.id)
            clearInterval(interval);
        });
    });

    const getApiAndEmit = socket => {
        socket.emit(auto.id, auto);
    };
}

module.exports = {
    create,
    update,
    list,
    uploadFile,
    getAutoById,
}