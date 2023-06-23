import NextAuth, {Account, Profile} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import {NextApiRequest, NextApiResponse} from 'next'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, {
        providers: [
            GoogleProvider({
                clientId:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
            })
        ],
        pages: {

            signIn: "/auth/signin",
        },
        callbacks: {
            async signIn({user, account, profile}) {
                return isAllowedToSignIn(account, profile)
            },
            async redirect({url, baseUrl}) {
                return baseUrl;
            },
            async session({ session, user, token }) {
                console.log('heeeeeeeere')
                return session
            },
            async jwt({ token, user, account, profile, isNewUser }) {
                return token
            }
        }
    })
}

function isAllowedToSignIn(account: Account | null, profile: Profile | undefined): boolean {
    if(account?.provider === 'google' && profile?.email?.endsWith('@the-experts.nl')) {
        return true
    }
    return false;
}


