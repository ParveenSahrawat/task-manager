const API = {};

API.POST = (app, url, model) => {
    app.post(url, async (req, res) => {
        try {
            const data = new model(req.body);
            const result = await data.save();
            res.status(201).send(result);
        } catch (error) {
            console.log(error);
            res.status(400).send(err);
        }
    });
}

API.GET = (app, url, model) => {
    app.get(url, async (req, res) => {
        try {
            const { _id } = req.params;
            if (_id)
                const result = await model.findById(_id);
            else
                const result = await model.find(req.params);
            if (!result)
                return res.status(404).send();
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }
    });
}

module.exports = API;

