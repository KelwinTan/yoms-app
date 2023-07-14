import LoginCard from "@components/auth/Login";
import NavWithAction from "@components/navigation/navbar";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavWithAction />

      <LoginCard></LoginCard>
    </>
  );
}
