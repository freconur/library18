import { setAuthCookies } from 'next-firebase-auth'
import initAuth from '../../initAuth'
import { NextRequest, NextResponse } from 'next/server'

initAuth()

const handler = async (req, res) => {
  try {
    await setAuthCookies(req, res)
  } catch (e) {
    console.log('error', e)
    return res.status(500).json({ error: 'Unexpected error.' })
  }
  return res.status(200).json({ success: true })
}

export default handler