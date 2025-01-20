import "./globals.css";
import { Roboto, Jersey_15 } from 'next/font/google'  

const roboto = Roboto({  
  weight: ['100', '300', '400', '500', '700', '900'],  
  style: ['normal', 'italic'],  
  subsets: ['latin'],  
})  

const jersey = Jersey_15({  
  weight: ['400'],  
  subsets: ['latin'],  
}) 


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${roboto.className} ${jersey.className}`}>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
