export default {
  endpoints: {
    prod: {},
    test: {},
    dev: {
      login: 'http://localhost:3000/sessions/login',
      logout: 'http://localhost:3000/sessions/logout',
      users: {
        getUsers: 'http://localhost:3000/users',
        getUser: 'http://localhost:3000/users/',
        createEmployee: 'http://localhost:3000/employees',
        updateEmployee: 'http://localhost:3000/employees/',
        getEmployees: 'http://localhost:3000/employees',
        getEmployee: 'http://localhost:3000/employees/',
        uploadFile: 'http://localhost:3000/employees/',
        deleteFile: 'http://localhost:3000/employees/',
        deleteEmployee: 'http://localhost:3000/employees/'
      },
      customers: {
        createCustomer: 'http://localhost:3000/clients',
        getCustomer: 'http://localhost:3000/clients/',
        getCustomers: 'http://localhost:3000/clients',
        updateCustomer: 'http://localhost:3000/clients/',
        uploadFile: 'http://localhost:3000/clients/',
        deleteFile: 'http://localhost:3000/clients/',
        deleteCustomer: 'http://localhost:3000/clients/'
      },
      projects: {
        createProject: 'http://localhost:3000/projects',
        getProjects: 'http://localhost:3000/projects',
        getProject: 'http://localhost:3000/projects/',
        updateProject: 'http://localhost:3000/projects/',
        uploadFile: 'http://localhost:3000/projects/',
        deleteFile: 'http://localhost:3000/projects/',
        deleteProject: 'http://localhost:3000/projects/'
      }
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