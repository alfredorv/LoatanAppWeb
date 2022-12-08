export default {
  data: {
    name: "",
    customer: "",
    manager: "",
    location: {
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      exterior_number: "",
      interior_number: "",
      zip_code: "",
      latitude: "",
      longitude: ""
    },
    dates: {
      start: "",
      end: ""
    },
    cost: {
      hired: 0,
      indirect: 0,
      direct: 0,
      utility: 0,
      financed: false,
      financial_cost: 0
    }
  },

  fetchData() {
    // fetch logic
  }

 }