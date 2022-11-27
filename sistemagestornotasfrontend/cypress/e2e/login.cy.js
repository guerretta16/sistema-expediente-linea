const { wait } = require("@testing-library/user-event/dist/utils");

describe('login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        sessionStorage.removeItem('nombreRol');
        sessionStorage.removeItem('idRol');
        sessionStorage.removeItem('jwt');
    }) 

    it('frontpage can be opened', () => {
        cy.contains('INICIAR SESION');
    })

    it('login sucess', () => {
        cy.get('[placeholder="Username"]').type('admin');
        cy.get('[placeholder="Password"]').type('password');
        cy.contains('INGRESAR').click();
        cy.contains('Bienvenido');
    });

    //it.only ejetuta solo un test
    it('login fails with wrong password', () => {
        cy.get('[placeholder="Username"]').type('admin');
        cy.get('[placeholder="Password"]').type('wrong');
        cy.contains('INGRESAR').click();
        cy.contains('The username or password is invalid');
        cy.get('.form__container--error').should('contain', 'The username or password is invalid');
    });

    describe('Assign Teacher', () => {

        it('assign teacher', () => {
            login();
            deleteAllRegister();
            cy.wait(1000);
            cy.visit('http://localhost:3000/asignacionDocentes/1/1');
            cy.contains('Asignación de profesores');

            cy.contains('Registrar').click({force: true});
            cy.get('select:first').select('1');
            cy.get('select:last').select('modelo');
            cy.contains('Aceptar').click();
            
            cy.contains('Juan Antonio');
        })

        it('assign same teacher fails', () => {
            login();
            deleteAllRegister();
            cy.wait(1000);
            cy.visit('http://localhost:3000/asignacionDocentes/1/1');
            cy.contains('Registrar').click({force: true});
            cy.get('select:first').select('1');
            cy.get('select:last').select('modelo');
            cy.contains('Aceptar').click();
            cy.contains('Juan Antonio');
            cy.wait(10000);

            cy.contains('Registrar', {timeout: 10000}).click({timeout: 10000, force: true});


            cy.get('select:first').select('1');
            cy.get('select:last').select('modelo');
            cy.contains('Aceptar').click({force: true});

            cy.get('.formCustom__error').should('contain', 'No se puede dos veces el mismo maestro');
        });

        it('assign two rol mentor', () => {
            login();
            deleteAllRegister();
            cy.wait(1000);
            cy.visit('http://localhost:3000/asignacionDocentes/1/1');
            cy.contains('Registrar').click();
            cy.get('select:first').select('1');
            cy.get('select:last').select('mentor');
            cy.contains('Aceptar').click({force: true});
            cy.contains('Juan Antonio');
            cy.wait(10000);

            cy.contains('Registrar').click({force: true});
            cy.get('select:first').select('2');
            cy.get('select:last').select('mentor');
            cy.contains('Aceptar').click();
            cy.get('.formCustom__error').should('contain', 'No puede registrar mas de 1 mentor');
        });

        it('assign more thre teacher', () => {
            login();
            deleteAllRegister();
            cy.wait(1000);
            cy.visit('http://localhost:3000/asignacionDocentes/1/1');
            cy.contains('Registrar').click({force: true});
            saveTeacher(1, 'mentor');
            cy.wait(10000);
            cy.contains('Registrar').click({force: true});
            saveTeacher(2, 'modelo');
            cy.wait(10000);
            cy.contains('Registrar').click({force: true});
            saveTeacher(3, 'modelo');
            cy.wait(5000);
            cy.get('.buttonRegisterContainer').should('be.empty');
        });

        it('delete assign teacher', () => {
            login();
            cy.visit('http://localhost:3000/asignacionDocentes/1/1');
            cy.log("Esta es una prueba de los logs");
            cy.contains('Eliminar').click();
            cy.contains('Aceptar').click();
            cy.wait(10000);
            cy.get('#table').find('tr').should('have.length', 3);
        })

    });
});

function login () {
    cy.request('POST', 'http://localhost:8000/api/login', {
        username: 'admin',
        password: 'password'
    }).then(response => {
        sessionStorage.setItem('jwt', response.body.jwt);
        sessionStorage.setItem('nombreRol', response.body.nombreRol);
        sessionStorage.setItem('idRol', response.body.idRol);
    });
}

function saveTeacher(idTeacher, rol) {
    cy.get('select:first').select(idTeacher);
    cy.get('select:last').select(rol);
    cy.contains('Aceptar').click();
}
function deleteAllRegister() {
    cy.request('POST', 'http://localhost:8000/api/test/deleteRegisterDocentesCurso?idNivelCurso=1&idPeriodo=1')
    .then(response => {
        cy.log(response);
    })
}