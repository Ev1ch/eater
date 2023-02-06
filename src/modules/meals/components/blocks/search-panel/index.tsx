import { useState } from 'react';

import { FormControlLabel, Paper, Switch } from '@/components/common';
import { NOOP } from '@/core/constants';
import { Sx } from '@/styles/types';

interface SearchPanelProps {
  onChange?: (check: boolean) => void;
  sx?: Sx;
  disabled?: boolean;
}

export default function SearchPanel({
  onChange = NOOP,
  sx = {},
  disabled = false,
}: SearchPanelProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (_, checked: boolean) => {
    setIsChecked(checked);
    onChange(checked);
  };

  return (
    <Paper sx={[{ p: 2 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <FormControlLabel
        control={<Switch checked={isChecked} onChange={handleChange} />}
        label="Can be cooked from my ingredients"
        disabled={disabled}
      />
    </Paper>
  );
}
