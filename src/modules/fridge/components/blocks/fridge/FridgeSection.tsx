import { useSelector } from '@/store/hooks';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
} from '@/components/common';
import { ExpandMore as ExpandMoreIcon } from '@/components/icons';
import type { IngredientType } from '@/modules/ingredient-types/domain';
import { selectFridgeIngredientsByType } from '@/modules/fridge/slice';
import { AMOUNT_TYPE_TO_NAME } from '@/modules/fridge/constants';

interface FridgeSectionProps {
  type: IngredientType;
}

export default function FridgeSection({ type }: FridgeSectionProps) {
  const ingredients = useSelector((state) => selectFridgeIngredientsByType(state, type))!;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{type.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {ingredients.map(({ id, ingredient, amount }) => (
            <ListItem
              key={id}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
              disablePadding
            >
              <Typography>{ingredient.name}</Typography>
              <Typography>
                {amount.value} {AMOUNT_TYPE_TO_NAME[amount.type]}
              </Typography>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
