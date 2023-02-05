import { Box, Typography } from '@/components/common';
import { MealForm } from '#/meals/components/blocks';

const AddMeal = () => {
  return (
    <Box>
      <Typography variant="h1">Add meal</Typography>
      <MealForm />
    </Box>
  );
};

export default AddMeal;
