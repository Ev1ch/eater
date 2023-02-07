import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  Typography,
} from '@/components/common';
import { ExpandMore as ExpandMoreIcon } from '@/components/icons';

interface FridgeSectionProps {
  index: number;
  stage: string[];
  open?: boolean;
}

export default function InstructionsStage({ stage, index, open = false }: FridgeSectionProps) {
  return (
    <Accordion defaultExpanded={open}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Stage {index}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={{ listStyleType: 'disc', pl: 2 }}>
          {stage.map((instruction) => (
            <ListItem
              key={instruction}
              sx={{ alignItems: 'center', justifyContent: 'space-between', display: 'list-item' }}
              disablePadding
            >
              <Typography>{instruction}</Typography>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
