/* eslint-disable react/jsx-props-no-spreading */
import { debounce } from '@mui/material';

import { useForm } from '#/forms/hooks';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@/components/common';
import { useDispatch, useSelector } from '@/store/hooks';
import type { Sx } from '@/styles/types';
import { DEFAULT_AMOUNT_TYPE, AMOUNT_TYPE_TO_NAME } from '#/fridge/constants';
import { addFridgeIngredient } from '#/fridge/slice';
import {
  getIngredientsByName,
  resetNamePageIndex,
  selectNamePagesToCurrent,
  setNameNextPageIndex,
} from '#/ingredients/slice';
import { useCallback, useEffect, useMemo } from 'react';
import { useMount } from '#/utils/hooks';

interface AddIngredientProps {
  sx?: Sx;
}

const defaultValues = {
  ingredient: '',
  amount: {
    type: DEFAULT_AMOUNT_TYPE,
    value: '',
  },
};

export default function AddIngredient({ sx = {} }: AddIngredientProps) {
  const dispatch = useDispatch();
  const pages = useSelector(selectNamePagesToCurrent);
  const ingredients = useMemo(
    () => pages.map(({ ingredients: currentIngredients }) => currentIngredients).flat(1),
    [pages],
  );
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting },
    watch,
  } = useForm({ defaultValues });
  const handleIngredientNameChange = async (name: string) => {
    dispatch(resetNamePageIndex());
    await dispatch(getIngredientsByName(name));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedIngredientNameChangeHandler = useCallback(
    debounce(handleIngredientNameChange, 500),
    [],
  );

  const handleAdd = async (data: typeof defaultValues) => {
    // TODO: Improve this logic
    try {
      await dispatch(
        addFridgeIngredient({
          ...data,
          ingredient: ingredients.find(({ name }) => name === data.ingredient)!.id,
        }),
      ).unwrap();
      reset();
    } catch (error) {
      // TODO: Add errors handling
    }
  };

  const handleLoadMoreIngredients = async () => {
    const name = getValues('ingredient');
    dispatch(setNameNextPageIndex());
    await dispatch(getIngredientsByName(name));
  };

  const handleIngredientsScroll = (event: React.SyntheticEvent) => {
    const listboxNode = event.currentTarget;

    if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
      handleLoadMoreIngredients();
    }
  };

  useEffect(() => {
    watch(({ ingredient }) => {
      debouncedIngredientNameChangeHandler(ingredient!);
    });
  }, [watch, debouncedIngredientNameChangeHandler]);

  useMount(async () => {
    const name = getValues('ingredient');
    await handleIngredientNameChange(name);
  });

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
          ListboxProps={{
            onScroll: handleIngredientsScroll,
          }}
          disablePortal
        />
        <Box sx={{ display: 'flex' }}>
          <TextField {...register('amount.value')} label="Amount" fullWidth required />
          <FormControl sx={{ minWidth: 80 }} required>
            <Select {...register('amount.type')}>
              {Object.keys(AMOUNT_TYPE_TO_NAME).map((ingredientType) => (
                <MenuItem key={ingredientType} value={ingredientType}>
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
