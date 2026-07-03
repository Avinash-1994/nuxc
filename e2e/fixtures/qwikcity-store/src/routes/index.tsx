import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

export const useStoreData = routeLoader$(async () => {
  return { featuredProducts: ['Zeptr Pro Kit', 'Qwik Builder', 'Enterprise Bundle'] };
});

export default component$(() => {
  const data = useStoreData();
  return (
    <main>
      <h1>⚡ Zeptr Qwik Store</h1>
      <p>Zero JS initial load. Resumable state.</p>
      <ul>{data.value.featuredProducts.map(p => <li key={p}>{p}</li>)}</ul>
    </main>
  );
});
