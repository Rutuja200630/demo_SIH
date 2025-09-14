import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="container mx-auto py-8 flex flex-col md:flex-row gap-4 items-center justify-between text-sm">
        <div className="opacity-75">© {new Date().getFullYear()} Smart Tourist Safety</div>
        <nav className="flex items-center gap-4">
          <Link to="/legal/privacy" className="hover:underline">Privacy</Link>
          <Link to="/legal/terms" className="hover:underline">Terms</Link>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
        <div className="flex items-center gap-2 opacity-75">
          <div className="h-5 w-5 rounded-full bg-primary/80" />
          <div className="h-5 w-5 rounded-full bg-accent/80" />
          <div className="h-5 w-5 rounded-full bg-green-600" />
        </div>
      </div>
    </footer>
  );
}
