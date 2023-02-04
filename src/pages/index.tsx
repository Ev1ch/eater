import { useTranslation } from '#/localization/hooks';

import wrapper from '@/store';
import { getT } from '#/localization/utils';
import '@/environment/client';
import { getAllAreas } from '@/modules/areas/service';

export default function Home() {
  const { t } = useTranslation();
  return <>{t('common:company.name')}</>;
}

export const getStaticProps = wrapper.getStaticProps(() => async ({ locale }) => {
  const t = await getT(locale, ['pages/home']);
  const title = t('pages/home:meta.title');

  console.log(await getAllAreas({
    limit: 1,
    offset: 2
  }));
  

  return {
    props: {
      title,
    },
  };
});
