import { useSelector } from '@/store/hooks';
import { Box, Typography } from '@/components/common';
import { selectFridgeIngredientsTypes } from '@/modules/fridge/slice/selectors';

import FridgeSection from './FridgeSection';
import AddIngredient from './AddIngredient';

export default function Fridge() {
  const types = useSelector(selectFridgeIngredientsTypes);

  return (
    <Box
      sx={{
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 1,
        py: 2,
        overflowY: 'auto',
      }}
    >
      <Typography sx={{ mr: 'auto', mb: 2 }} variant="h2">
        Fridge
      </Typography>
      <AddIngredient sx={{ mb: 'auto', width: '100%' }} />
      <Box sx={{ mt: 'auto', width: '100%' }}>
        {types.map((type) => (
          <FridgeSection key={type.id} type={type} />
        ))}
      </Box>
    </Box>
  );
}
