const Test = require('../models/test-model')

createTest = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a test',
        })
    }

    const test = new Test(body)

    if (!test) {
        return res.status(400).json({ success: false, error: err })
    }

    test
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: test._id,
                message: 'Test created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Test not created!',
            })
        })
}

updateTest = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Test.findOne({ _id: req.params.id }, (err, test) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Test not found!',
            })
        }
        test.name = body.name
        test.time = body.time
        test.rating = body.rating
        test
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: test._id,
                    message: 'Test updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Test not updated!',
                })
            })
    })
}

deleteTest = async (req, res) => {
    await Test.findOneAndDelete({ _id: req.params.id }, (err, test) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!test) {
            return res
                .status(404)
                .json({ success: false, error: `Test not found` })
        }

        return res.status(200).json({ success: true, data: test })
    }).catch(err => console.log(err))
}

getTestById = async (req, res) => {
    await Test.findOne({ _id: req.params.id }, (err, test) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!test) {
            return res
                .status(404)
                .json({ success: false, error: `Test not found` })
        }
        return res.status(200).json({ success: true, data: test })
    }).catch(err => console.log(err))
}

getTests = async (req, res) => {
    await Test.find({}, (err, tests) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!tests.length) {
            return res
                .status(404)
                .json({ success: false, error: `Test not found` })
        }
        return res.status(200).json({ success: true, data: tests })
    }).catch(err => console.log(err))
}

uploadFile = async (req, res) => {
    if (req.files.archive.size === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.archive

    file.mv('/home/wagner/tmp/teste.jpg', function(err) {
        if(err)
            return res.status(500).send(err);

        console.log(req);
        console.log(req.files.archive.name);
        res.status(200).json({ success: true })
    })
}

module.exports = {
    createTest,
    updateTest,
    deleteTest,
    getTests,
    getTestById,
    uploadFile,
}