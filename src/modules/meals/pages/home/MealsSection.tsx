import InfiniteScroll from 'react-infinite-scroll-component';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Grid, Button, Typography } from '@/components/common';
import NextLinkComposed from '@/components/common/link';
import { useDispatch, useSelector } from '@/store/hooks';
import { selectUser } from '#/user/slice';
import { SearchPanel } from '../../components/blocks';
import { MealCard } from '../../components/common';
import { Meal } from '../../domain';
import {
  getCanBeCookedMeals,
  getLatestMeals,
  selectAllCanBeCookedPagesToCurrent,
  selectAllLatestPagesToCurrent,
  selectCanBeCookedHasMore,
  selectLatestHasMore,
  setCanBeCookedNextPageIndex,
  setLatestNextPageIndex,
} from '../../slice';

export default function MealsSection() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const [canBeCooked, setCanBeCooked] = useState(false);
  const latestPages = useSelector(selectAllLatestPagesToCurrent);
  const canBeCookedPages = useSelector(selectAllCanBeCookedPagesToCurrent);
  const latestHasMore = useSelector(selectLatestHasMore);
  const canBeCookedHasMore = useSelector(selectCanBeCookedHasMore);
  const pages = canBeCooked ? canBeCookedPages : latestPages;
  const setNextPage = canBeCooked ? setCanBeCookedNextPageIndex : setLatestNextPageIndex;
  const hasMore = canBeCooked ? canBeCookedHasMore : latestHasMore;

  const getMeals = useCallback(async () => {
    if (canBeCooked) {
      await dispatch(getCanBeCookedMeals()).unwrap();
    } else {
      await dispatch(getLatestMeals()).unwrap();
    }
  }, [canBeCooked, dispatch]);

  const handleCanBeCooked = (checked: boolean) => {
    setCanBeCooked(checked);
  };

  const handleMealClick = (meal: Meal) => {
    router.push(`/${meal.id}`);
  };

  const handleLoadMoreMeals = async () => {
    dispatch(setNextPage());

    await getMeals();
  };

  useEffect(() => {
    if (canBeCooked && !pages.length) {
      getMeals();
    }
  }, [pages, canBeCooked, getMeals]);

  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ mb: 2, position: 'sticky', top: 0, bgcolor: 'background.default', zIndex: 1 }}>
        <Typography sx={{ mb: 2 }} variant="h2">
          Meals
        </Typography>
        {user && (
          <Button
            href="/addMeal"
            component={NextLinkComposed}
            sx={{
              mb: 2,
            }}
          >
            <Typography color="common.black">Add meal</Typography>
          </Button>
        )}

        <SearchPanel onChange={handleCanBeCooked} disabled={!user} />
      </Box>
      <InfiniteScroll
        dataLength={pages.length}
        next={handleLoadMoreMeals}
        loader={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Box>
            <Typography>Loading...</Typography>
          </Box>
        }
        hasMore={hasMore}
        endMessage={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Box sx={{ mt: 2 }}>
            <Typography>There is no more meals :(</Typography>
          </Box>
        }
      >
        <Grid spacing={2} container>
          {pages.map(({ meals }) =>
            meals.map((meal) => (
              <Grid key={meal.id} xs={12} md={6} item>
                <MealCard sx={{ height: '100%' }} meal={meal} onNameClick={handleMealClick} />
              </Grid>
            )),
          )}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
}
