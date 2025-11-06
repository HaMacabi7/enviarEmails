document.addEventListener('DOMContentLoaded', function () {

    // Obj almacena VALORES de campos
    const email = {
        email: '',
        asunto: '',
        mensaje: '',
        cc: ''

    }

    //Seleccionar elementos del DOM
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const inputCC = document.querySelector('#cc');

    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //Asigna evento input a los campos
    inputEmail.addEventListener('input', validar);
    inputCC.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    //Asignar evento al form cuando se envía
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function (e) {
        e.preventDefault(); //previene comportamiento por defecto
        resetFormulario(); //reiniciar form

    })

    //Simula el envío de mensaje a través del formulario
    function enviarEmail(e) {
        e.preventDefault(); //Previene recarga de página

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden'); //spinner visible

            resetFormulario();

            //Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500','text-white','p-2','text-center','rounded-lg','mt-10',
              'font-bold','text-sm','uppercase' ); 

            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito); //agrega párrafo al form

            // Remueve alerta de éxito después de 3 segundos
            setTimeout(() => {
                alertaExito.remove();
            }, 3000);  

        }, 3000); //Spinner dura 3 segundos
    }

    // Se ejecuta cada vez que el usuario escribe en campos
    function validar(e) { 
        if (e.target.value.trim() === '') { //Si valor de campo es un vacío
            // Si el campo está vacío, no mostrar error a menos que sea obligatorio
            if (e.target.id !== 'cc') {  // Si el campo no es cc
                //Se muestra alerta de obligatorio
                mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement); //Se le pasa el DIV
            }
            email[e.target.name] = '';
            comprobarEmail();
            return; // Detiene el código
        }

        //Si campo es email y el valor no es un email válido
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El Email no es válido', e.target.parentElement);
            email[e.target.name] = ''; //se asigna valor vacío a ese campo en el objeto
            comprobarEmail();
            return;
        }

        //Si campo es cc y no es vacío y no es email válido
        if (e.target.id === 'cc' && e.target.value.trim() !== '' && !validarEmail(e.target.value)) {
            mostrarAlerta('El Email en CC no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }


        limpiarAlerta(e.target.parentElement);

        //Asignar valores al objeto
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //Comprobar objeto
        comprobarEmail();
    }

    //Para mostrar mensaje de error en form
    function mostrarAlerta(mensaje, referencia) { //Recibe el mensaje y el contenedor donde se inserta alerta
        limpiarAlerta(referencia); //limpia alertas existentes

        //Generar parrafo de alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje; //asigna mensaje recibido
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        //Inyectar error en el DIV
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        //Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove(); //elimina alerta previa
        }
    }

    function validarEmail(email) { //valida formato de email
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email); //retorna true o false
        return resultado;
    }

    function comprobarEmail() {
        if (email.email === '' || email.asunto === '' || email.mensaje === '') { 
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;

        }

        //si están completos
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
         //Reiniciar objeto
         email.email = '';
         email.asunto = '';
         email.mensaje = '';
         email.cc = '';
 
         formulario.reset();
         comprobarEmail();
    }
});

/*
El par e es el objeto de evento que contiene información sobre el evento que se dispara, 
como el campo en el que el usuario está escribiendo
*/