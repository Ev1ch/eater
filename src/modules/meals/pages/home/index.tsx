import { useSelector } from '@/store/hooks';
import { Grid } from '@/components/common';
import { selectUser } from '#/user/slice';
import MealsSection from './MealsSection';
import FridgeSection from './FridgeSection';

export default function Home() {
  const user = useSelector(selectUser);

  return (
    <Grid sx={{ flexGrow: 1 }} columnSpacing={{ xs: 0, sm: 2 }} container>
      <Grid xs={12} sm={user ? 7 : 12} item>
        <MealsSection />
      </Grid>
      {user && <FridgeSection />}
    </Grid>
  );
}
