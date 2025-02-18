import { Header } from "@/components/header/Header"
import type { PropsWithChildren } from "react"


const Main = ({ children }: PropsWithChildren) => {



    return (
        <div className="bg-gradient-to-br from-background to-muted">
            <Header />
            <main className="min-h-screen contaier mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto text-center">
                    <p>©️ All rights reserved by LaZyFee || 2025</p>
                </div>
            </footer>
        </div>
    )

}

export default Main