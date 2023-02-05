import { useTranslation } from '#/localization/hooks';

import wrapper from '@/store';
import { getT } from '#/localization/utils';
import '@/environment/client';
import getMealsByIngredients from '@/modules/meals/service/getMealsByIngredients';
import { AmountType } from '@/modules/ingredients/domain';
import { addIngredient } from '@/modules/fridge/service';

export default function Home() {
  const { t } = useTranslation();
  return <>{t('common:company.name')}</>;
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
