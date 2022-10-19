import database from '../../database'

export default async function getOrder(req, res) {
  const { ids } = req.query

  try {
    const order = await database.select('ids', 'id', 'link', 'quantity', 'status', 'start_counter', 'remains', 'changed', 'created', 'refill', 'api_provider_id', 'api_order_id').where({ ids }).table('orders')
    return res.status(200).json({ ok: true, data: order })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ ok: false, message: error.message })
  }
}
