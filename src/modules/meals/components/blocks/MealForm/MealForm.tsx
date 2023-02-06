import {
  Autocomplete,
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Stack,
  Button,
  Fab,
} from '@/components/common';
import { Add, Delete } from '@/components/icons';
import { Controller } from '#/forms/components';
import { useForm, useFieldArray } from '#/forms/hooks';
import { useSelector } from '@/store/hooks';
import { selectIngredientsArray } from '#/ingredients/slice/selectors';
import { AMOUNT_TYPE_TO_NAME, DEFAULT_AMOUNT_TYPE } from '#/fridge/constants';
import { selectAreasArray } from '#/areas/slice';
import { selectTagsArray } from '#/tags/slice';
import { selectCategoriesArray } from '#/categories/slice';
import { AmountType } from '#/ingredients/domain';
import * as service from '../../../service';
import { Tag } from '#/tags/domain';
import { Category } from '#/categories/domain';
import { Area } from '#/areas/domain';

interface InitialValues {
  name: string;
  area: Area;
  category: Category;
  tags: Tag[];
  instructions: Record<string, string>[];
  ingredients: {
    ingredient: string;
    amount: { type: AmountType; value: string };
  }[];
}

const defaultIngredientValue = { ingredient: '', amount: { type: DEFAULT_AMOUNT_TYPE, value: '' } };
const defaultInstructionValue = { text: '' };

const MealForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    control,
  } = useForm<InitialValues>({
    defaultValues: {
      name: '',
      area: {},
      category: {},
      tags: [],
      instructions: [defaultInstructionValue],
      ingredients: [defaultIngredientValue],
    },
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

  const ingredients = useSelector(selectIngredientsArray);
  const categories = useSelector(selectCategoriesArray);
  const areas = useSelector(selectAreasArray);
  const tags = useSelector(selectTagsArray);

  const onSubmit = (data) => {
    console.log(data);
    try {
      // await service.addMeal({
      //
      // })
    } catch {}
  };
  const handleAddIngredient = (data) => {};

  return (
    <Box onSubmit={handleSubmit(onSubmit)} component="form">
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
              <Fab
                sx={{
                  ml: 2,
                }}
                size="small"
                onClick={() => removeIngredient(index)}
              >
                <Delete />
              </Fab>
            </Box>
          ))}
        </Stack>
        <Fab
          sx={{ mb: 2, mt: 1 }}
          size="small"
          onClick={() => appendIngredient(defaultIngredientValue)}
        >
          <Add />
        </Fab>
      </Box>

      <Box
        sx={{
          mb: 3,
        }}
      >
        <Stack spacing={1}>
          {instructionsFields.map((item, index) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TextField {...register(`instructions.${index}.text`)} label="Cooking instruction" />
              <Fab
                sx={{
                  ml: 2,
                }}
                size="small"
                onClick={() => removeInstruction(index)}
              >
                <Delete />
              </Fab>
            </Box>
          ))}
        </Stack>
        <Fab
          sx={{
            mt: 1,
          }}
          size="small"
          onClick={() => appendInstruction(defaultInstructionValue)}
        >
          <Add />
        </Fab>
      </Box>

      <Stack
        spacing={2}
        sx={{
          mb: 2,
        }}
      >
        <Autocomplete
          {...register('category')}
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
        <Autocomplete
          options={areas}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box {...props} key={option.id} component="li">
              {option.name}
            </Box>
          )}
          renderInput={(params) => <TextField {...params} {...register('area')} label="Area" />}
          onChange={(_, value) => setValue('area', value!)}
          disablePortal
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
};

export default MealForm;
