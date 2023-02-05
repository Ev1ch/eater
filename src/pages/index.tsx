import { useTranslation } from '#/localization/hooks';

import wrapper from '@/store';
import { getT } from '#/localization/utils';
import '@/environment/client';
import { Button } from '@mui/material';
import { getCurrentUser, signInWithPopup } from '@/modules/user/service';

export default function Home() {
  const { t } = useTranslation();

  const handleLogin = async () => {
    await signInWithPopup();

    console.log(123, await getCurrentUser());
  };

  return (
    <>
      <Button onClick={handleLogin}>Login</Button>
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
