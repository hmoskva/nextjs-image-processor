/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";
import Head from "next/head";
import "reflect-metadata";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="A Simple Offline Image Compressor Built With Nextjs"
        />
        <title>React Image Compressor</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
