import ApiClient from 'utils/apiClient';
import { Response, Suggestion, TagOptionGroup } from 'types';

class TagService {
  static suggestions(query: string): Promise<Response<TagOptionGroup[]>> {
    return ApiClient.get<Suggestion[]>('/tags/suggestions', { query }).then(response => {
      const data = groupSuggestionsByType(response.data);
      return new Promise(resolve => resolve({ data } as Response<TagOptionGroup[]>));
    });
  }
}

const groupSuggestionsByType = (suggestions: Suggestion[]): TagOptionGroup[] => {
  const initial: TagOptionGroup[] = [
    {
      label: 'Users',
      options: [],
    },
    {
      label: 'Tags',
      options: [],
    },
  ];
  const groupedSuggestion = suggestions.reduce((groups, suggestion) => {
    const a = {
      label: suggestion.name,
      value: suggestion.id,
      user: suggestion.user,
    };
    groups[suggestion.user ? 0 : 1].options.push(a);
    return groups;
  }, initial);

  return groupedSuggestion.filter(group => group.options.length);
};

export default TagService;
