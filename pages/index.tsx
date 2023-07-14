import CallToActionWithAnnotation from "@components/job/hero";
import FooterWithLogoCentered from "@components/navigation/footer";
import NavWithAction from "@components/navigation/navbar";
import JobsView from "@pages/job/jobsview";
import styles from "@styles/Home.module.css";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Jobs = ["test", "test2"];

const Home: NextPage = () => {
  return (
    <>
      <NavWithAction />

      <div className={styles.container}>
        <Head>
          <title>Indo Dev</title>
          <meta name="description" content="Indo Dev website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <CallToActionWithAnnotation />

          <JobsView />
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
        <FooterWithLogoCentered />
      </div>
    </>
  );
};

export default Home;
