import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '../../utils/session'
import { AuthResponse } from '../../types/user'
import { fetchAPI } from '../../utils/api'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    try {
        const token = req.session.token;

        const user = await fetchAPI<AuthResponse>("/users/me", {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}
