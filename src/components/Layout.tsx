import { Outlet, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export default function Layout({
  isAuthenticated,
  setIsAuthenticated
}: LayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Stock Portfolio
          </Link>
          <div className="space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/portfolio" className="hover:underline">
                  Portfolio
                </Link>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
                <Link to="/register" className="hover:underline">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}