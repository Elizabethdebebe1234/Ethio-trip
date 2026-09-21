import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">EthioTrip</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/trip-planner">Trip Planner</Link>
          <Link to="/my-trip">My Trip</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
