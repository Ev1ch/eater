import { Fridge } from '#/fridge/components/blocks';
import { selectUser } from '#/user/slice';
import { Grid, Typography, Box } from '@/components/common';
import { useSelector } from '@/store/hooks';
import { useState } from 'react';
import { SearchPanel } from '../../components/blocks';
import { MealCard } from '../../components/common';
import { selectAllCanBeCookedPagesToCurrent, selectAllLatestPagesToCurrent } from '../../slice';

export default function Home() {
  const user = useSelector(selectUser);
  const [canBeCooked, setCanBeCooked] = useState(false);
  const latestPages = useSelector(selectAllLatestPagesToCurrent);
  const canBeCookedPages = useSelector(selectAllCanBeCookedPagesToCurrent);
  const pages = canBeCooked ? canBeCookedPages : latestPages;

  const handleCanBeCooked = (checked: boolean) => {
    setCanBeCooked(checked);
  };

  return (
    <Grid sx={{ flexGrow: 1, maxHeight: '100%' }} container>
      <Grid
        sx={{ maxHeight: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        sm={user ? 7 : 12}
        item
      >
        <Box sx={{ maxHeight: '100%', px: 1, py: 2 }}>
          <Box sx={{ mb: 2, position: 'static' }}>
            <Typography sx={{ mb: 2 }} variant="h2">
              Meals
            </Typography>
            <SearchPanel onChange={handleCanBeCooked} />
          </Box>
          <Grid sx={{ maxHeight: '100%', overflowY: 'auto', pr: 4 }} spacing={2} container>
            {pages.map(
              ({ meals }) =>
                meals.map((meal) => (
                  <Grid key={meal.id} xs={12} lg={6} item>
                    <MealCard meal={meal} />
                  </Grid>
                )),
              <hr />,
            )}
          </Grid>
        </Box>
      </Grid>
      <Grid
        sx={[
          { flexGrow: 1, maxHeight: '100%', overflowY: 'auto' },
          !user && {
            width: 0,
          },
        ]}
        sm={user ? 5 : 0}
        item
      >
        <Fridge />
      </Grid>
    </Grid>
  );
}
