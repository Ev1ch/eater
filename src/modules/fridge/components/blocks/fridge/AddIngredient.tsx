/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Autocomplete,
  TextField,
  FormControl,
  MenuItem,
  Select,
  Button,
} from '@/components/common';
import { AmountType } from '@/modules/ingredients/domain';
import { selectIngredientsArray } from '@/modules/ingredients/slice';
import { useDispatch, useSelector } from '@/store/hooks';
import { Sx } from '@/styles/types';
import { useForm } from '#/forms/hooks';
import { DEFAULT_AMOUNT_TYPE } from '@/modules/fridge/constants';
import { addFridgeIngredient } from '@/modules/fridge/slice';

interface AddIngredientProps {
  sx?: Sx;
}

const AMOUNT_TYPE_TO_NAME: Record<AmountType, string> = {
  [AmountType.G]: 'g',
  [AmountType.KG]: 'kg',
  [AmountType.L]: 'l',
};

const defaultValues = {
  ingredient: '',
  amount: {
    type: DEFAULT_AMOUNT_TYPE,
    value: '',
  },
};

export default function AddIngredient({ sx = {} }: AddIngredientProps) {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredientsArray);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({ defaultValues });

  const handleAdd = async (data: typeof defaultValues) => {
    // TODO: Improve this logic
    try {
      await dispatch(addFridgeIngredient({ ...data })).unwrap();
      reset();
    } catch (error) {
      // TODO: Add errors handling
    }
  };

  return (
    <Box
      sx={[{ textAlign: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}
      onSubmit={handleSubmit(handleAdd)}
      component="form"
    >
      <Box sx={{ mb: 2 }} component="fieldset" disabled={isSubmitting}>
        <Autocomplete
          options={ingredients}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box {...props} key={option.id} component="li">
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField {...params} {...register('ingredient')} label="Ingredient" required />
          )}
          disablePortal
        />
        <Box sx={{ display: 'flex' }}>
          <TextField {...register('amount.value')} label="Amount" fullWidth required />
          <FormControl sx={{ minWidth: 80 }} required>
            <Select {...register('amount.type')}>
              {Object.keys(AMOUNT_TYPE_TO_NAME).map((ingredientType) => (
                <MenuItem value={ingredientType}>
                  {AMOUNT_TYPE_TO_NAME[ingredientType as keyof typeof AMOUNT_TYPE_TO_NAME]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Button type="submit" disabled={isSubmitting}>
        Add
      </Button>
    </Box>
  );
}