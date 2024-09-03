import type { NextPage } from "next";
import Head from "next/head";
import Home from "../views/Home";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Click 2 Deploy</title>
      </Head>
      <Home />
    </>
  );
};

export default Index;
