import { Outlet, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Layout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
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
            {user.data ? (
              <>
                <Link to="/portfolio" className="hover:underline">
                  Portfolio
                </Link>
                <span className="text-sm">
                  Welcome, {user.data?.data.username}
                </span>
                <Button variant="secondary" onClick={handleLogout}>
                  Logout
                </Button>
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
