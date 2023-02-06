import { chunk } from 'lodash';

import { Grid, Box, Stack, Image, Typography } from '@/components/common';
import { Public as PublicIcon } from '@/components/icons';
import { IngredientChip } from '#/ingredients/components/common';
import { useSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { DEFAULT_MEAL_IMAGE } from '../../constants';
import { selectMealById } from '../../slice';
import InstructionsStage from './InstructionsStage';

export default function Meal() {
  const { query } = useRouter();
  const id = query.id as string;
  const meal = useSelector((state) => selectMealById(state, id));
  const image = meal?.image || DEFAULT_MEAL_IMAGE;
  const instructionsStages = chunk(meal.instructions, 4);

  return (
    <Box sx={{ py: 2, px: 1 }}>
      <Box sx={{ mb: 2, position: 'static' }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h2">{meal.name}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>{meal.category.name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PublicIcon />
              <Typography sx={{ ml: 0.5 }}>{meal.area.name}</Typography>
            </Box>
          </Box>
        </Box>
        {/* <Paper sx={{ p: 2 }}>
          <Button variant="outlined">Back</Button>
        </Paper> */}
      </Box>
      <Grid container spacing={1}>
        <Grid xs={12} sm={6} item>
          <Box sx={{ height: 400, mb: 2 }}>
            <Image
              src={image}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              width={620}
              height={620}
            />
          </Box>
          <Stack direction="row" sx={{ flexWrap: 'wrap' }} gap={1}>
            {meal.ingredients.map(({ ingredient }) => (
              <IngredientChip key={ingredient.id} ingredient={ingredient} />
            ))}
          </Stack>
        </Grid>
        <Grid xs={12} sm={6} item>
          {instructionsStages.map((stage, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <InstructionsStage key={index} index={index + 1} stage={stage} open={index === 0} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
