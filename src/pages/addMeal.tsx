import Head from 'next/head';

import AddMeal from '#/meals/components/pages/AddMeal';
import { getAreas } from '#/areas/slice';
import { getTags } from '#/tags/slice';
import { getCategories } from '#/categories/slice';
import { getLatestIngredients } from '#/ingredients/slice';
import { getCurrentUser } from '#/user/slice';
import wrapper from '@/store';

const AddMealPage = () => {
  return (
    <>
      <Head>
        <title>Add meal</title>
      </Head>
      <AddMeal />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async () => {
  await dispatch(getCurrentUser()).unwrap();
  await dispatch(getLatestIngredients()).unwrap();
  await dispatch(getCategories());
  await dispatch(getAreas());
  await dispatch(getTags());

  return {
    props: {},
  };
});

export default AddMealPage;
