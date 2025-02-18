import { Link } from "react-router-dom";
import { CitySearch } from "./CitySearch";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to={"/"}>
                    <h1 className="text-2xl font-bold tracking-tight">Weather App</h1>
                </Link>

                <div className="flex gap-4">
                    <CitySearch />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}