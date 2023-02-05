import wrapper from '@/store';
import { getT } from '#/localization/utils';
import { Home as HomePage } from '#/meals/pages';

export default function Home() {
  return <HomePage />;
}

export const getStaticProps = wrapper.getStaticProps(() => async ({ locale }) => {
  const t = await getT(locale, ['pages/home']);
  const title = t('pages/home:meta.title');

  return {
    props: {
      title,
    },
  };
});
