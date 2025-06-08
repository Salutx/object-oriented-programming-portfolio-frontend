import normalize from '@/lib/normalize';
import { SelectItem } from '../../UniversalSelect.types';

const filterByTitleNested = (text: string, opts: SelectItem): boolean => {
  const searchText = text.toLowerCase();
  const title = opts?.label?.toLowerCase() ?? '';

  if (title.includes(searchText)) {
    return true;
  }

  const group = opts?.groupedData ?? [];

  return Array.isArray(group) && group.some((item) => filterByTitleNested(searchText, item));
};

function deepFilterItems(text: string, items: SelectItem[]): SelectItem[] {
  const searchText = text.toLowerCase();

  return items
    .map((item) => {
      const titleMatch = item.label?.toLowerCase().includes(searchText);

      if (titleMatch) {
        return {
          ...item,
          group: item.groupedData,
        };
      }

      let filteredGroup: SelectItem[] | undefined;

      if (Array.isArray(item.groupedData)) {
        filteredGroup = deepFilterItems(searchText, item.groupedData);
      }

      if (filteredGroup && filteredGroup.length > 0) {
        return {
          ...item,
          group: filteredGroup,
        };
      }

      return null;
    })
    .filter(Boolean) as SelectItem[];
}

function filterFn(text: string, options: SelectItem[], searchKeys: (keyof SelectItem)[]) {
  return deepFilterItems(text, options);
}

export default { filterFn };
