import { useSelector } from '@/store/hooks';
import { Box, Typography } from '@/components/common';
import { selectFridgeIngredientsTypes } from '@/modules/fridge/slice/selectors';
import type { Sx } from '@/styles/types';
import FridgeSection from './FridgeSection';
import AddIngredient from './AddIngredient';

interface FridgeProps {
  sx?: Sx;
}

export default function Fridge({ sx = {} }: FridgeProps) {
  const types = useSelector(selectFridgeIngredientsTypes);

  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 1,
          py: 2,
          overflowY: 'auto',
          bgcolor: 'background.default',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
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
