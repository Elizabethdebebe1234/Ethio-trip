const baseUrl = "http://localhost:3000";

export default function sitemap() {
  return [
    {
      url: baseUrl,
      priority: 1,
    },
    {
      url: `${baseUrl}/destinations`,
      priority: 0.8,
    },
  ];
}