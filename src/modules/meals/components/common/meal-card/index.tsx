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
  Chip,
} from '@/components/common';
import { Public as PublicIcon } from '@/components/icons';
import { IngredientChip } from '#/ingredients/components/common';
import { Meal } from '#/meals/domain';
import { NOOP } from '@/core/constants';

interface IMealCardProps {
  meal: Meal;
  onNameClick?: (meal: Meal) => void;
  onClick?: (meal: Meal) => void;
}

const DEFAULT_VISIBLE_INSTRUCTION_ITEMS = 2;

const DEFAULT_VISIBLE_TAGS = 4;

export default function MealCard({ meal, onNameClick = NOOP, onClick = NOOP }: IMealCardProps) {
  const handleNameClick = () => {
    onNameClick(meal);
  };

  const handleClick = () => {
    onClick(meal);
  };

  return (
    <Card onClick={handleClick}>
      <CardHeader
        title={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Typography
            sx={{ cursor: 'pointer' }}
            onClick={handleNameClick}
            variant="h5"
            component="p"
          >
            {meal.name}
          </Typography>
        }
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
      <CardMedia component="img" sx={{ maxHeight: 200 }} image={meal.image} />
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
        <Stack direction="row" sx={{ flexWrap: 'wrap' }} gap={1}>
          {meal.ingredients.slice(0, DEFAULT_VISIBLE_TAGS).map(({ ingredient }) => (
            <IngredientChip key={ingredient.id} ingredient={ingredient} />
          ))}
          {meal.ingredients.length > DEFAULT_VISIBLE_TAGS && <Chip label="..." />}
        </Stack>
      </CardContent>
    </Card>
  );
}
