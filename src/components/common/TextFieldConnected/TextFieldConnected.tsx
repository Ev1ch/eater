import { TextFieldProps } from '@mui/material/TextField';
import { TextField } from '@mui/material';
import { useField } from 'formik';

type TextFieldConnectedProps = TextFieldProps & { name: string };

const TextFieldConnected = ({ name, ...props }: TextFieldConnectedProps) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      {...field}
      {...props}
    />
  );
};

export default TextFieldConnected;
