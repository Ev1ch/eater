import { useSelector } from '@/store/hooks';
import { Grid } from '@/components/common';
import { Fridge } from '#/fridge/components/blocks';
import { selectUser } from '#/user/slice';
import { MealCard } from '../../components/common';
import { selectMeals } from '../../slice';

export default function Home() {
  const user = useSelector(selectUser);
  const meals = useSelector(selectMeals);

  return (
    <Grid sx={{ flexGrow: 1 }} container>
      <Grid sm={user ? 7 : 12} item>
        <Grid container>
          {Object.values(meals).map((meal) => (
            <Grid key={meal.id} xs={12} md={6} item>
              <MealCard meal={meal} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid sx={{ flexGrow: 1, overflow: 'hidden' }} sm={user ? 5 : 0} item>
        <Fridge />
      </Grid>
    </Grid>
  );
}
