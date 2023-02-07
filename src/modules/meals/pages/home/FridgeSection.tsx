import { useEffect, useState } from 'react';

import { Grid, IconButton, Paper } from '@/components/common';
import { ExpandLess as ExpandMoreIcon, ExpandMore as ExpandLessIcon } from '@/components/icons';
import { Fridge } from '#/fridge/components/blocks';

export default function FridgeSection() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleState = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <Grid
      sx={[
        {
          position: { xs: 'fixed', sm: 'sticky' },
          top: { xs: 'calc(100% - 50px)', sm: 0 },
          left: { xs: 0, sm: 'initial' },
          right: { xs: 0, sm: 'initial' },
          bottom: { xs: 0, sm: 'initial' },
          zIndex: 1101,
          height: '100vh',
          bgcolor: 'background.default',
          display: 'flex',
          maxHeight: '100vh',
          flexDirection: 'column',
        },
        isOpen && {
          top: { xs: 0 },
        },
      ]}
      xs={12}
      sm={5}
      item
    >
      <Paper sx={{ px: 1, py: 1, display: { sm: 'none' } }}>
        <IconButton onClick={handleToggleState}>
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Paper>
      <Fridge sx={{}} />
    </Grid>
  );
}
