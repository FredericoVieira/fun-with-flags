const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ApiClient = (baseUrl) => ({
  async get(endpoint) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`);

      if (!response.ok) {
        return [null, `HTTP error! Status: ${response.status}`];
      }

      const data = await response.json();
      return [data, null];
    } catch (error) {
      console.error("API request failed:", error);
      return [null, error.message];
    }
  },
});

const api = ApiClient(apiUrl);

const baseFields = "cca3,flags,name,capital,region,population";

const countriesApi = {
  getAll: () => api.get(`/all?fields=${baseFields}`),
  getCountry: (id) =>
    api.get(
      `/alpha/${id}?fields=${baseFields},languages,currencies,tld,borders`
    ),
};

export { countriesApi };
