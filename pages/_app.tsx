import '@/styles/globals.css';
import App, { AppProps, AppContext, AppInitialProps } from 'next/app';
import styles from '@/styles/App.module.css';
import { useEffect, useState } from 'react';

type AppAdditionalProps = { host: string };

export default function MyApp({
  Component,
  pageProps,
}: AppProps & AppAdditionalProps) {
  const [host, setHost] = useState<string | null>(null);

  console.log('pageProps', pageProps);

  useEffect(() => {
    if (pageProps.host) {
      console.log('host: ', pageProps.host);
      setHost(host);
    }
  }, [pageProps.host]);

  return (
    <>
      <main className={`${styles.main}`}>
        <Component {...pageProps} />
        <h1>host from props in _app.tsx : {host} </h1>
      </main>
    </>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppAdditionalProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  const host = context.ctx.req?.headers.host;

  console.log('host: ', host);

  const pageProps = {
    ...ctx.pageProps,
    host: context.ctx.req?.headers.host,
  };

  return { ...ctx, pageProps } as AppAdditionalProps & AppInitialProps;
};
