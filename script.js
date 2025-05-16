
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registroEvento');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const correo = form.correo.value.trim();
    const telefono = form.telefono.value.trim();
    const intereses = Array.from(form.querySelectorAll('input[name="intereses"]:checked')).map(i => i.value);
    const horario = form.querySelector('input[name="horario"]:checked');
    const fecha = form.fecha.value;
    const hora = form.hora.value;
    const archivo = form.archivo.files[0];

    if (!nombre || !correo || !telefono || intereses.length === 0 || !horario || !fecha || !hora) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('correo', correo);
    formData.append('telefono', telefono);
    intereses.forEach(i => formData.append('intereses[]', i));
    formData.append('horario', horario.value);
    formData.append('fecha', fecha);
    formData.append('hora', hora);
    if (archivo) formData.append('archivo', archivo);

    try { // Esta URL es un ejemplo, para conectar con el backend se ocupa la URL del servidor, esto (backend) apenas lo ando aprendiendo jeje
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', { 
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Registro exitoso. ¡Gracias por registrarte!');
        form.reset();
      } else {
        alert('Error al enviar el formulario. Intenta nuevamente.');
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor. Revisa tu conexión.');
      console.error(error);
    }
  });
});
