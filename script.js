document.addEventListener('DOMContentLoaded', () => {
  const z = window.Zod; 
  const form = document.getElementById('registroEvento');

  const schema = z.object({
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    correo: z.string().email("Correo inválido"),
    telefono: z.string().regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos"),
    intereses: z.array(z.string()).min(1, "Selecciona al menos un interés"),
    horario: z.string().nonempty("Selecciona un horario"),
    fecha: z.string().nonempty("Selecciona una fecha"),
    hora: z.string().nonempty("Selecciona una hora"),
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const correo = form.correo.value.trim();
    const telefono = form.telefono.value.trim();
    const intereses = Array.from(form.querySelectorAll('input[name="intereses"]:checked')).map(i => i.value);
    const horario = form.querySelector('input[name="horario"]:checked')?.value || "";
    const fecha = form.fecha.value;
    const hora = form.hora.value;

    const data = { nombre, correo, telefono, intereses, horario, fecha, hora };
    const result = schema.safeParse(data);

    document.querySelectorAll('.error-message').forEach(div => div.textContent = '');

    if (!result.success) {
      result.error.errors.forEach(err => {
        const field = err.path[0];
        const errorDiv = document.getElementById(`${field}Error`);
        if (errorDiv) errorDiv.textContent = err.message;
      });
      return;
    }

    const formData = new FormData(form);
    try {
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
