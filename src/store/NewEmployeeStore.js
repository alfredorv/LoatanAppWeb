export default {
  data: {
    work_area_id: null,
    position_id: 1,
    supervisor_id: 1,
    supervised_ids: [],
    personal_information: {
      names: "",
      paternal_surname: "",
      maternal_surname: "",
      cellphone: "",
      phone: "",
      birthday: "",
      met_since: ""
    },
    user: {
      email: ""
    },
    tax_information: {
      rfc: "",
      business_name: "",
      tax_residence: ""
    }
  },

  fetchData() {
    // fetch logic
  }
}