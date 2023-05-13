// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {jewelryData} from '@/utils/data'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {id} = req.query
    res.status(200).json(jewelryData.find(product => product.id.toString()==id))
}