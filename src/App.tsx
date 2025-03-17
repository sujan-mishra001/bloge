import useTheme from "./hooks/useTheme";
import AppRoutes from "./routes/appRoutes";

export default function App() {
  useTheme();
  return <AppRoutes />;
}
