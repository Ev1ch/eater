import { useTranslation } from '#/localization/hooks';

import wrapper from '@/store';
import { getT } from '#/localization/utils';
import '@/environment/client';
import { addIngredient, deleteIngredientById } from '@/modules/fridge/service';
import { AmountType } from '@/modules/ingredients/domain';

export default function Home() {
  const { t } = useTranslation();
  return <>{t('common:company.name')}</>;
}

export const getStaticProps = wrapper.getStaticProps(() => async ({ locale }) => {
  const t = await getT(locale, ['pages/home']);
  const title = t('pages/home:meta.title');

  const a = await addIngredient({
    amount: {
      type: AmountType.L,
      value: '2',
    },
    ingredient: '0353a2c1-77c9-44ee-9121-ba2bc839efb1'
  })
  // console.log(await deleteIngredientById(a.id));
  

  return {
    props: {
      title,
    },
  };
});
