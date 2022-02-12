import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '../../utils/session'
import { AuthResponse } from '../../types/user'
import { fetchAPI } from '../../utils/api'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {
            user, jwt
        } = await fetchAPI<AuthResponse>("/auth/local", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: req.body,
        });

        req.session.user = { id: user.id, email: user.email, last_name: user.last_name, name: user.name }
        req.session.shoppingBag = user.shopping_bag
        req.session.token = jwt
        await req.session.save()
        res.json({ user, jwt })
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}
