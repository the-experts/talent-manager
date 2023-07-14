"use client"

export default function ProvidersWrapper({
                                       children
                                   }: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children} { /* our entire app -> has access to NextAuth */ }
        </div>
    )
}
