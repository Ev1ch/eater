import Head from 'next/head';

import AddMeal from '#/meals/components/pages/AddMeal';
import wrapper from '@/store';
import { getIngredients } from '#/ingredients/slice';

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
  await dispatch(getIngredients());

  return {
    props: {},
  };
});

export default AddMealPage;
