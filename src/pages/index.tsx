import { useTranslation } from '#/localization/hooks';

import wrapper from '@/store';
import { getT } from '#/localization/utils';
import '@/environment/client';
import { Button } from '@mui/material';

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Button>Login</Button>
      {t('common:company.name')}
    </>
  );
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
