import { Box, Typography } from '@/components/common';
import { MealForm } from '#/meals/components/blocks';

function AddMeal() {
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          my: 2,
      }}
      >Add meal
      </Typography>
      <MealForm />
    </Box>
  );
}

export default AddMeal;
