import { Form, Formik } from 'formik';

import { TextFieldConnected, Autocomplete } from '@/components/common';
import { useSelector } from '@/store/hooks';
import { Ingredient } from '#/ingredients/domain';
import { selectIngredients, selectNormalizedIngredients } from '#/ingredients/slice/selectors';

interface InitialValues {
  name: string;
  ingredients: Ingredient[];
}

const initialValues: InitialValues = {
  name: '',
  ingredients: [],
};

const MealForm = () => {
  const ingredients = useSelector(selectIngredients);
  const onSubmit = () => {};

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          <TextFieldConnected id="name" name="name" label="Meal name" variant="outlined" />
          <Autocomplete
            multiple
            id="tags-outlined"
            options={Object.values(ingredients)}
            getOptionLabel={(option) => option.name}
            onChange={(_, value) =>
              setFieldValue('ingredients', [...values.ingredients, value], true)
            }
            filterSelectedOptions
            renderInput={(params) => (
              <TextFieldConnected
                {...params}
                name="ingredients"
                label="Ingredients"
                placeholder="Select meal ingredients"
              />
            )}
          />
        </Form>
      )}
    </Formik>
  );
};

export default MealForm;
