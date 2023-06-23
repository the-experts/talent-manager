import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";


const Page = () => {
    const { data: session} = useSession();

    return (
        <div>login</div>
    );
};

export default Page;
