import FooterWithLogoCentered from "@components/navigation/footer";
import NavWithAction from "@components/navigation/navbar";
import ProfileView from "@components/user/Profile";
import styles from "@styles/Home.module.css";
import Head from "next/head";

export default function Profile() {
  return (
    <>
      <NavWithAction />

      <div className={styles.container}>
        <Head>
          <title>User Profile</title>
          <meta name="description" content="user profile indo-dev" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* <UserProfileEdit /> */}

        <main className={styles.main}>
          <ProfileView />
        </main>

        <FooterWithLogoCentered />
      </div>
    </>
  );
}
