const mapping: Record<string, string> = {
  doctors: 'doctor',
  'fitness-goals': 'fitness_goal',
  'medicinal-reminders': 'medicinal_reminder',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
