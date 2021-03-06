import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useSWR from "swr";

// fetcher function to enable use of SWR callback
const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export default function Home() {
  const { data, error } = useSWR("/api/snowflake", fetcher);
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;
  console.log("data after swr in index.js->", data.data.data);
  if (data.data.data.unsplash_Random_Photo_By_Query.urls.full === null) {
    return <div>null response</div>;
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>Generate a Random Snowflake</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>Generate a random image of a snowflake &rarr;</h2>
              <Image
                src={data.data.data.unsplash_Random_Photo_By_Query.urls.full}
                alt="snowflake"
                width="100%"
                height="100%"
                priority={true}
                loading="eager"
              />
              <div>
                <button className={styles.button}>Submit</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
