import { GetCurrentlySignedInUser } from "@api/auth";
import LoadingScreen from "@components/loader/LoadingScreen";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AuthRoute = <T,>(Component: React.ComponentType<T>) => {
  return (pageProps: T) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      GetCurrentlySignedInUser().then((user) => {
        if (user) {
          setAuthenticated(true);
        } else {
          router.push("/");
        }
      });
    }, []);

    if (authenticated) {
      return <Component {...pageProps} user={user} />;
    } else {
      return <LoadingScreen />;
    }
  };
};
export default AuthRoute;
