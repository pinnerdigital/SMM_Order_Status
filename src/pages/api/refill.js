import database from '../../database'

export default async function getOrder(req, res) {
  const { api_provider_id, api_order_id } = req.query

  try {
    const provider = await database.select('*').where({ id: api_provider_id }).table('api_providers').first()
    const fetchRefill = await fetch(`${provider.url}?key=${provider.key}&action=refill&order=${api_order_id}`).then(r=>r.json())
    
    return res.status(200).json({ ok: true, data: fetchRefill })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ ok: false, message: error.message })
  }
}
