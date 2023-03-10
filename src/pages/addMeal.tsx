import Head from 'next/head';

import AddMeal from '#/meals/components/pages/AddMeal';
import { getAreas } from '#/areas/slice';
import { getTags } from '#/tags/slice';
import { getCategories } from '#/categories/slice';
import { getLatestIngredients } from '#/ingredients/slice';
import { useUser } from '#/user/hooks';
import wrapper from '@/store';

function AddMealPage() {
  useUser({ redirectTo: '/' });

  return (
    <>
      <Head>
        <title>Add meal</title>
      </Head>
      <AddMeal />
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async () => {
  await dispatch(getLatestIngredients()).unwrap();
  await dispatch(getCategories());
  await dispatch(getAreas());
  await dispatch(getTags());

  return {
    props: {},
  };
});

export default AddMealPage;
