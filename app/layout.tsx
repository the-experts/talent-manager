import './globals.css'
import ProvidersWrapper from "@/app/ProvidersWrapper";

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'font-plus-jakarta-sans'}>
      <ProvidersWrapper>
        {children}
      </ProvidersWrapper>
      </body>
    </html>
  )
}
