import { useSelector } from '@/store/hooks';
import { Box } from '@/components/common';
import { selectFridgeIngredientsTypes } from '@/modules/fridge/slice/selectors';

import FridgeSection from './FridgeSection';
import AddIngredient from './AddIngredient';

export default function Fridge() {
  const types = useSelector(selectFridgeIngredientsTypes);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 2,
        py: 3,
      }}
    >
      <AddIngredient sx={{ mb: 'auto' }} />
      <Box sx={{ mb: 'auto', width: '100%' }}>
        {types.map((type) => (
          <FridgeSection type={type} />
        ))}
      </Box>
    </Box>
  );
}
