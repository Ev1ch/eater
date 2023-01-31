import type { ResponseArea } from './abstract';
import type { Area } from './domain';

export default function mapToArea(responseArea: ResponseArea): Area {
  return { id: responseArea.id };
}
