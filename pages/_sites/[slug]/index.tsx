import { useEffect, useState } from 'react';
import { db, getPaths } from '../../../src/utils';

export default function Home({ pageProps: { config } }) {
  const [_config, _setConfig] = useState();

  useEffect(() => {
    if (config) {
      console.log('config: ', config)
      _setConfig(config);
    }
  }, [config]);

  return (
    <>
      {_config ? (
        <h1>pages/_sites/[slug]/index {_config.slug}</h1>
      ) : (
        <h2>pages/_sites/[slug]/index no _config</h2>
      )}
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: await getPaths(),
    fallback: true,
  };
}

export async function getStaticProps(props: any) {
  const config = db.find((site) => site.slug === props.params.slug);

  return {
    props: {
      config,
    },
  };
}
