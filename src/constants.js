export default {
  urls: {
    dev: 'http://localhost:3000',
    staging: 'https://staging-loatanapp.herokuapp.com',
    prod: 'https://loatanapp.herokuapp.com',
  },
  endpoints: {
    login: '/sessions/login',
    logout: '/sessions/logout',
    users: {
      getUsers: '/users',
      getUser: '/users/',
      createEmployee: '/employees',
      updateEmployee: '/employees/',
      getEmployees: '/employees',
      getEmployee: '/employees/',
      getManagers: '/construction_managers',
      uploadFile: '/employees/',
      deleteFile: '/employees/',
      deleteEmployee: '/employees/'
    },
    customers: {
      createCustomer: '/clients',
      getCustomer: '/clients/',
      getCustomers: '/clients',
      updateCustomer: '/clients/',
      uploadFile: '/clients/',
      deleteFile: '/clients/',
      deleteCustomer: '/clients/'
    },
    projects: {
      createProject: '/projects',
      getProjects: '/projects',
      getProject: '/projects/',
      updateProject: '/projects/',
      uploadFile: '/projects/',
      deleteFile: '/projects/',
      deleteProject: '/projects/'
    }
  },
  states: [
    'Aguascalientes',
    'Baja California',
    'Baja California Sur',
    'Campeche',
    'Chiapas',
    'Chihuahua',
    'Ciudad de México',
    'Coahuila',
    'Colima',
    'Durango',
    'Estado de México',
    'Guanajuato',
    'Guerrero',
    'Hidalgo',
    'Jalisco',
    'Michoacán',
    'Morelos',
    'Nayarit',
    'Nuevo León',
    'Oaxaca',
    'Puebla',
    'Querétaro',
    'Quintana Roo',
    'San Luis Potosí',
    'Sinaloa',
    'Sonora',
    'Tabasco',
    'Tamaulipas',
    'Tlaxcala',
    'Veracruz',
    'Yucatán',
    'Zacatecas'
  ],
  areas: [
    'Obra',
    'Comercialización',
    'Proyectos',
    'Administración',
    'Desarrollo'
  ],
  areasMap : {
    'Obra': 1,
    'Comercialización': 2,
    'Proyectos': 3,
    'Administración': 4,
    'Desarrollo': 5
  },
  project: {
    status: {
      'active': 'Activo'
    },
    attachments: {
      'arquitectural_ifc_filename': 'IFC Arquitectónico',
      'structural_ifc_filename': 'IFC Estructural',
      'installations_ifc_filename': 'IFC de Instalaciones'
    }
  },
  customer: {
    attachments: {
      'avatar_filename': 'Foto de perfil',
      'ine_filename': 'INE',
      'constitutive_act_filename': 'Acta constitutiva',
      'tax_situation_proof_filename': 'Constancia de situación fiscal'
    }
  },
  employee: {
    attachments: {
      'avatar_filename': 'Foto de perfil'
    }
  }
}