import database from '../../database'

export default async function getOrder(req, res) {
  const { ids, link } = req.query

  try {
    const order = await database.select('*').where({ ids, link }).table('orders')
    return res.status(200).json({ ok: true, data: order })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ ok: false, message: error.message })
  }
}
