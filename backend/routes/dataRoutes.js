import express from 'express'
import asyncHandler from 'express-async-handler'

const router = express.Router()

// @desc Fetch all data
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const Alldata = await DataCovid.find({})
    res.json(Alldata)
  })
)

// @desc Fetch sigle State
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const data = await DataCovidByState.findById(req.params.id)
    if (data) {
      res.json(data)
    } else {
      res.status(404)
      throw new Error('Product Not Found')
    }
  })
)
export default router
