import { useDispatch, useSelector } from '@/store/hooks';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  IconButton,
  Box,
} from '@/components/common';
import { ExpandMore as ExpandMoreIcon, Delete as DeleteIcon } from '@/components/icons';
import type { IngredientType } from '@/modules/ingredient-types/domain';
import { deleteFridgeIngredientById, selectFridgeIngredientsByType } from '@/modules/fridge/slice';
import { AMOUNT_TYPE_TO_NAME } from '@/modules/fridge/constants';

interface FridgeSectionProps {
  type: IngredientType;
}

export default function FridgeSection({ type }: FridgeSectionProps) {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => selectFridgeIngredientsByType(state, type))!;

  const getDeleteIngredientHandler = (id: string) => async () => {
    await dispatch(deleteFridgeIngredientById(id)).unwrap();
  };

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
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              disablePadding
            >
              <Typography>{ingredient.name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 1 }}>
                  {amount.value} {AMOUNT_TYPE_TO_NAME[amount.type]}
                </Typography>
                <Box>
                  <IconButton onClick={getDeleteIngredientHandler(id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
