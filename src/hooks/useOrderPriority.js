import { PRIORITY_OPTIONS } from '../consts/order';

export const useOrderPriority = (priority) => {
  // eslint-disable-next-line eqeqeq
  const priorityData = PRIORITY_OPTIONS.find(({ value }) => value == priority);

  const { icon, label } = priorityData;

  return {
    priorities: PRIORITY_OPTIONS,
    icon,
    label,
  };
};
