import {
  Card,
  Stack,
  Box,
  Typography,
  CardMedia,
  CardContent,
  CardHeader,
  List,
  ListItem,
} from '@/components/common';
import { Public as PublicIcon } from '@/components/icons';
import { IngredientChip } from '#/ingredients/components/common';
import { Meal } from '#/meals/domain';

interface IMealCardProps {
  meal: Meal;
}

const DEFAULT_VISIBLE_INSTRUCTION_ITEMS = 2;

export default function MealCard({ meal }: IMealCardProps) {
  return (
    <Card>
      <CardHeader
        title={meal.name}
        subheader={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>{meal.category.name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PublicIcon />
              <Typography sx={{ ml: 0.5 }}>{meal.area.name}</Typography>
            </Box>
          </Box>
        }
      />
      <CardMedia component="img" image={meal.image} />
      <CardContent>
        <List sx={{ mb: 2, listStyleType: 'disc', pl: 2 }} component="ol" disablePadding>
          {meal.instructions.slice(0, DEFAULT_VISIBLE_INSTRUCTION_ITEMS).map((instruction) => (
            <ListItem key={instruction} sx={{ display: 'list-item' }} disablePadding>
              <Typography
                sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              >
                {instruction}
              </Typography>
            </ListItem>
          ))}
          {meal.instructions.length > DEFAULT_VISIBLE_INSTRUCTION_ITEMS && (
            <ListItem disablePadding>...</ListItem>
          )}
        </List>
        <Stack direction="row" spacing={1}>
          {meal.ingredients.map(({ ingredient }) => (
            <IngredientChip ingredient={ingredient} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
