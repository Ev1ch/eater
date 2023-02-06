import wrapper from '@/store';
import { getT } from '#/localization/utils';
import { Home as HomePage } from '#/meals/pages';
import { getCurrentUser } from '#/user/slice';
import { getMeals } from '#/meals/slice';
import { getIngredients } from '@/modules/ingredients/service';

export default function Home() {
  return <HomePage />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) =>
    async ({ locale }) => {
      const t = await getT(locale, ['pages/home']);
      const title = t('pages/home:meta.title');

      // await dispatch(getCurrentUser());
      // await dispatch(getMeals());

      return {
        props: {
          title,
        },
      };
    },
);
