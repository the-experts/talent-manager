import NextAuth, {Account} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {NextApiRequest, NextApiResponse} from "next";

export default NextAuth({
            providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            })
        ],
})

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//     return await NextAuth(req, res, {
//         providers: [
//             GoogleProvider({
//                 clientId: process.env.GOOGLE_CLIENT_ID as string,
//                 clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//             })
//         ],
//         pages: {
//             signIn: "/auth/signin",
//         },
//         callbacks: {
//             async signIn({user, account, profile}) {
//                 console.log('user', user);
//                 return isAllowedToSignIn(account, profile)
//             },
//             async redirect({url, baseUrl}) {
//                 return baseUrl;
//             },
//             async session({ session, user, token }) {
//                 return session
//             },
//             async jwt({ token, user, account, profile, isNewUser }) {
//                 return token
//             }
//         }
//     })
// }
//
// function isAllowedToSignIn(account: Account | null, profile: any): boolean {
//     if (account?.provider === 'google' && (profile?.email?.endsWith('@the-experts.nl' || profile?.email?.endsWith('@the-experts.com')))) {
//         console.log('may sign in')
//         return true
//     }
//     return false;
// }

