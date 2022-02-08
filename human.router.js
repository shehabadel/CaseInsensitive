const express = require('express');
const Human = require('./human.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const doc = await Human.find({});
        res.status(200).json({ doc })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
})

router.post('/humans', async (req, res, next) => {
    try {
        const doc = await Human.create({ ...req.body });
        res.status(201).json({ doc })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
})

router.get('/humans', async (req, res, next) => {
    const talentPattern = req.query.talents //extracting talent from the query portion of the URL
    try {
        const doc = await Human.find({
            talents:
                { $regex: `^${talentPattern}`, $options: 'i' } //finding talent that match this regex (talentParam)
        });
        res.status(200).json({ doc });
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
})

router.get('/alotoftalents/humans', async (req, res, next) => {
    try {
        const talentsList = req.query.talents; //extracting list of talents from the query portion of the URL
        var inTalentsList = [] //holding RegExp objects of case-insensitive talents list 
        talentsList.forEach(talent => {
            var inTalent = RegExp(`^${talent}`, 'i') //RegExp object contains talent pattern and case-insensitive option
            inTalentsList.push(inTalent)
        });

        const doc = await Human.find({
            talents: { $all: inTalentsList }
        })
        res.status(200).json({ data: doc })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
})
module.exports = router;
