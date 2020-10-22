// commom DATA
// Credibility Logos
const credibilityLogos = {
    EN: {
        bbb: 'https://www.bbb.org/us/fl/plantation/profile/credit-services/debtcom-llc-0633-90080459',
        goDaddy: 'https://seal.godaddy.com/verifySeal?sealID=VttdGalb6RNnHGweH1ZPwYmmYt3XSbYeXM2Jk90v88Poa2JxPmkvASdRAOnA',
        trustPilot: 'https://www.debt.com/reviews/',
    },
    ES: {
        bbb: 'https://www.bbb.org/us/fl/plantation/profile/credit-services/debtcom-llc-0633-90080459',
        goDaddy: 'https://seal.godaddy.com/verifySeal?sealID=VttdGalb6RNnHGweH1ZPwYmmYt3XSbYeXM2Jk90v88Poa2JxPmkvASdRAOnA',
        trustPilot: 'https://www.debt.com/es/resenas/',
    },
};

// CallUs section
const callUsData = {
    EN: {
        text: 'Or call: ',
    },
    ES: {
        text: 'Llámenos al: ',
    },
};

// Personal Form
const formData = {
    label: {
        EN: {
            name: 'First Name',
            lastname: 'Last Name',
            phone: 'Phone Number',
            email: 'Email Address',
            state: 'State',
            calendar: 'Date and Time',
        },
        ES: {
            name: 'Nombre',
            lastname: 'Apellido',
            phone: 'Número Telefónico',
            email: 'Correo Electrónico',
            state: 'Estado',
            calendar: 'Fecha y Hora',
        },
    },
    inputsError: {
        EN: {
            name: 'The First Name field must be letters only.',
            lastname: 'The Last Name field must be letters only.',
            phone: 'Invalid Phone number.',
            email: 'Invalid Email address.',
            state: 'The State is required.',
            calendar: 'The Calendar is required.',
        },
        ES: {
            name: 'Su Nombre debe contener solo letras.',
            lastname: 'Sus Apellidos deben contener solo letras',
            phone: 'El número de teléfono es inválido.',
            email: 'El correo electrónico es inválido.',
            state: 'El campo Estado es requerido.',
            calendar: 'Es requerido seleccionar al menos una fecha.',
        },
    },
    cta: {
        EN: {
            btnTitle: 'BOOK NOW',
        },
        ES: {
            btnTitle: 'RESERVAR',
        },
    },
};

// Name of working days of week
const workingDaysOfWeek = {
    EN: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    ES: ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'],
};

export { credibilityLogos, callUsData, formData, workingDaysOfWeek };
