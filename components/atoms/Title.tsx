import React from "react";

type PageTitleProps = {
    children: React.ReactNode,
}

export default function Title({children}: PageTitleProps) {
    return (
        <h1 className={'text-2xl font-bold text-gray-700'}>{children}</h1>
    )
}
