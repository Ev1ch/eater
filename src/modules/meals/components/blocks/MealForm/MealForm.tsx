import { useCallback, useEffect, useMemo } from 'react';
import { debounce } from '@mui/material';

import {
  Autocomplete,
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Stack,
  Button,
  IconButton,
} from '@/components/common';
import { Add, Delete } from '@/components/icons';
import { Controller } from '#/forms/components';
import { useForm, useFieldArray } from '#/forms/hooks';
import { useSelector } from '@/store/hooks';
import { selectNamePagesToCurrent } from '#/ingredients/slice/selectors';
import { AMOUNT_TYPE_TO_NAME, DEFAULT_AMOUNT_TYPE } from '#/fridge/constants';
import { selectAreasArray } from '#/areas/slice';
import { selectTagsArray } from '#/tags/slice';
import { selectCategoriesArray } from '#/categories/slice';
import { AmountType } from '#/ingredients/domain';
import { useMount } from '#/utils/hooks';
import {
  getIngredientsWithSearch,
  resetNamePageIndex,
  setNameNextPageIndex,
} from '#/ingredients/slice';
import useDispatch from '@/store/hooks/useDispatch';
import { Tag } from '#/tags/domain';
import { Category } from '#/categories/domain';
import { Area } from '#/areas/domain';
import { FormIngredient } from '#/ingredients/domain/Ingredient';
import * as service from '../../../service';

interface FormValues {
  name: string;
  area: Area | null;
  category: Category | null;
  tags: Tag[];
  instructions: Record<'text', string>[];
  ingredients: FormIngredient[];
}

const defaultIngredientValue = { ingredient: '', amount: { type: DEFAULT_AMOUNT_TYPE, value: '' } };
const defaultInstructionValue = { text: '' };

const defaultValues: FormValues = {
  name: '',
  area: null,
  category: null,
  tags: [],
  instructions: [defaultInstructionValue],
  ingredients: [defaultIngredientValue],
};

function MealForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    setValue,
    control,
    reset,
    watch,
  } = useForm<FormValues>({
    defaultValues,
  });
  const {
    fields: ingredientsFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: 'ingredients',
  });
  const {
    fields: instructionsFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: 'instructions',
  });

  const pages = useSelector(selectNamePagesToCurrent);
  const ingredients = useMemo(
    () => pages.map(({ ingredients: currentIngredients }) => currentIngredients).flat(1),
    [pages],
  );

  const categories = useSelector(selectCategoriesArray);
  const areas = useSelector(selectAreasArray);
  const tags = useSelector(selectTagsArray);

  const onSubmit = async ({
    name,
    area,
    instructions,
    tags,
    ingredients: selectedIngredients,
    category,
  }: FormValues) => {
    try {
      const formattedIngredients = selectedIngredients.reduce(
        (
          accumulator: {
            ingredient: string;
            amount: { type: AmountType; value: string };
          }[],
          { ingredient, ...other },
        ) => {
          const ingredientId = ingredients.find(({ name }) => name === ingredient)!.id;

          // eslint-disable-next-line no-param-reassign
          accumulator = [
            ...accumulator,
            {
              ingredient: ingredientId,
              ...other,
            },
          ];

          return accumulator;
        },
        [],
      );

      await service.addMeal({
        name,
        area: area!.id,
        category: category!.id,
        tags: tags.map(({ id }) => id),
        instructions: instructions.map(({ text }) => text),
        ingredients: formattedIngredients,
      });
      reset();
    } catch (e) {
      // TODO: Add errors handling
    }
  };
  const handleIngredientNameChange = (name: string) => async () => {
    dispatch(resetNamePageIndex());
    await dispatch(getIngredientsWithSearch(name));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedIngredientNameChangeHandler = useCallback(
    (ingredient: string) => debounce(handleIngredientNameChange(ingredient), 500),
    [],
  );

  const handleLoadMoreIngredients = () => async () => {
    const ingredients = getValues('ingredients');
    dispatch(setNameNextPageIndex());
    ingredients.forEach(
      async ({ ingredient }) => dispatch(getIngredientsWithSearch(ingredient)),
    );
  };

  const handleIngredientsScroll = (event: React.SyntheticEvent) => () => {
    const listboxNode = event.currentTarget;

    if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
      handleLoadMoreIngredients();
    }
  };

  useEffect(() => {
    watch(({ ingredients }) => {
      // @ts-ignore
      ingredients!.forEach(({ ingredient }) => {
        debouncedIngredientNameChangeHandler(ingredient!);
      });
    });
  }, [watch, debouncedIngredientNameChangeHandler]);

  useMount(async () => {
    const { ingredient } = getValues('ingredients.0');
    await handleIngredientNameChange(ingredient);
  });

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{
        pb: 2,
      }}
    >
      <TextField
        {...register('name')}
        label="Meal name"
        required
        sx={{
          mb: 2,
        }}
      />

      <Box
        sx={{
          mb: 3,
        }}
      >
        <Stack spacing={2}>
          {ingredientsFields.map((item, index) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
              key={item.id}
            >
              <Box sx={{ width: '100%' }} component="fieldset">
                <Autocomplete
                  options={ingredients}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <Box {...props} key={option.id} component="li">
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...register(`ingredients.${index}.ingredient`)}
                      label="Ingredient"
                      required
                    />
                  )}
                  ListboxProps={{
                    onScroll: (e) => handleIngredientsScroll(e),
                  }}
                  disablePortal
                />
                <Box sx={{ display: 'flex', mt: 1 }}>
                  <TextField
                    {...register(`ingredients.${index}.amount.value`)}
                    label="Amount"
                    fullWidth
                    required
                  />
                  <FormControl sx={{ minWidth: 80 }} required>
                    <Select {...register(`ingredients.${index}.amount.type`)}>
                      {Object.keys(AMOUNT_TYPE_TO_NAME).map((ingredientType) => (
                        <MenuItem value={ingredientType}>
                          {AMOUNT_TYPE_TO_NAME[ingredientType as keyof typeof AMOUNT_TYPE_TO_NAME]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <IconButton
                sx={{
                  ml: 2,
                }}
                size="small"
                onClick={() => removeIngredient(index)}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
        </Stack>
        <IconButton
          sx={{ mb: 2, mt: 1 }}
          size="small"
          onClick={() => appendIngredient(defaultIngredientValue)}
        >
          <Add />
        </IconButton>
      </Box>

      <Box
        sx={{
          mb: 3,
        }}
      >
        <Stack spacing={1}>
          {instructionsFields.map((item, index) => (
            <Box
              key={index} // order do not change, fields are appending, performance will be ok
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TextField {...register(`instructions.${index}.text`)} label="Cooking instruction" />
              <IconButton
                sx={{
                  ml: 2,
                }}
                size="small"
                onClick={() => removeInstruction(index)}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
        </Stack>
        <IconButton
          sx={{
            mt: 1,
          }}
          size="small"
          onClick={() => appendInstruction(defaultInstructionValue)}
        >
          <Add />
        </IconButton>
      </Box>

      <Stack
        spacing={2}
        sx={{
          mb: 2,
        }}
      >
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={categories}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box {...props} key={option.id} component="li">
                  {option.name}
                </Box>
              )}
              renderInput={(params) => <TextField {...params} label="Categories" />}
              onChange={(_, value) => setValue('category', value!)}
              disablePortal
              filterSelectedOptions
            />
          )}
        />
        <Controller
          name="area"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={areas}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box {...props} key={option.id} component="li">
                  {option.name}
                </Box>
              )}
              renderInput={(params) => <TextField {...params} label="Area" />}
              onChange={(_, value) => setValue('area', value!)}
              disablePortal
            />
          )}
        />
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={tags}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box {...props} key={option.id} component="li">
                  {option.name}
                </Box>
              )}
              renderInput={(params) => <TextField {...params} label="Tags" />}
              onChange={(_, value) => setValue('tags', [...value])}
              multiple
              disablePortal
              filterSelectedOptions
            />
          )}
        />
      </Stack>
      <Button type="submit" disabled={isSubmitting}>
        Add meal
      </Button>
    </Box>
  );
}

export default MealForm;
