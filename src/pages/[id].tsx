import wrapper from '@/store';
import { getT } from '#/localization/utils';
import { Meal as MealPage } from '#/meals/pages';
import { getCurrentUser } from '#/user/slice';
import { getMealById } from '#/meals/slice';

export default function Meal() {
  return <MealPage />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) =>
    async ({ locale, query }) => {
      const id = query.id as string;
      const t = await getT(locale, ['pages/meal']);
      const title = t('pages/meal:meta.title');

      await dispatch(getCurrentUser()).unwrap();
      const meal = await dispatch(getMealById(id)).unwrap();

      if (!meal) {
        return {
          notFound: true,
        };
      }

      return {
        props: {
          title,
        },
      };
    },
);
