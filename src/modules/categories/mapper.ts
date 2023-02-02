import type { ResponseCategory } from './abstract';
import type { Category } from './domain';

export default function mapToCategory(responseCategory: ResponseCategory): Category {
  return { id: responseCategory.id };
}
