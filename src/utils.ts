export const db = [
  { slug: 'ttc', domain: 'http://ttc.plantingparty.org' },
  { slug: 'root', domain: 'http://www.plantingparty.org' },
];


/**
 * Returns the paths for `getStaticPaths` based on the slug of every
 * available domain.
 */
export async function getPaths() {
  // build paths for each of the sites in the previous two lists
  return db.map((item) => {
    return { params: { slug: item.slug } };
  });
}