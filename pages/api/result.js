export default function handler(req, res) {

    const {data} = req.body;
    console.log('msg', data)
    //console.log('msg', req)

    res.status(200).json({ name: req })
}

