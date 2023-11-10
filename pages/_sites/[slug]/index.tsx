import { useEffect, useState } from 'react';
import { db, getPaths } from '../../../src/utils';

interface Props {
  config: string;
}

export default function Home({ config }: Props) {
  console.log('config: ', config);

  const [_config, _setConfig] = useState<string | null>(null);

  useEffect(() => {
    if (config) {
      console.log('config: ', config);
      _setConfig(config);
    }
  }, [config]);

  return (
    <>
      {_config ? (
        <h1>pages/_sites/[slug]/index {JSON.stringify(_config)}</h1>
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
