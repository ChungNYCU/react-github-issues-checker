
import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization: {
                params: { scope: "repo" }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                //@ts-ignore
                token.id = profile.id
            }

            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            //@ts-ignore
            session.accessToken = token.accessToken
            //@ts-ignore
            session.user.id = token.id
            console.log(session.accessToken)
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOptions)