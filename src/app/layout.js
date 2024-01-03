"use client";

import "./globals.css";
import { Inter } from "next/font/google";


import { QueryClient, QueryClientProvider } from "react-query";





const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();
 const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-white">
        <QueryClientProvider client={queryClient}>
        
      
            <div className="min-h-screen">{children}</div>
            
        </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}