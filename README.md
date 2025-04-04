<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Cita Médica (Appointment)</title>
</head>
<body>

    <h2>Formulario de Cita Médica</h2>
    <form id="appointmentForm">
        <label for="identifierSystem">Sistema de Identificación:</label>
        <input type="text" id="identifierSystem" required><br>

        <label for="identifierValue">ID del Paciente:</label>
        <input type="text" id="identifierValue" required><br>

        <label for="status">Estado de la Cita:</label>
        <select id="status">
            <option value="booked">Reservado</option>
            <option value="arrived">Llegó</option>
            <option value="fulfilled">Completado</option>
            <option value="cancelled">Cancelado</option>
            <option value="noshow">No Asistió</option>
        </select><br>

        <label for="startDateTime">Fecha y Hora de Inicio:</label>
        <input type="datetime-local" id="startDateTime" required><br>

        <label for="endDateTime">Fecha y Hora de Fin:</label>
        <input type="datetime-local" id="endDateTime" required><br>

        <label for="participantType">Rol del Participante:</label>
        <select id="participantType">
            <option value="patient">Paciente</option>
            <option value="practitioner">Médico</option>
            <option value="related-person">Familiar</option>
        </select><br>

        <label for="participantActor">Nombre del Participante:</label>
        <input type="text" id="participantActor" required><br>

        <button type="submit">Crear Cita</button>
    </form>

    <script>
        document.getElementById('appointmentForm').addEventListener('submit', function(event) {
            event.preventDefault();

            // Obtener valores del formulario
            const identifierSystem = document.getElementById('identifierSystem').value;
            const identifierValue = document.getElementById('identifierValue').value;
            const status = document.getElementById('status').value;
            const startDateTime = document.getElementById('startDateTime').value;
            const endDateTime = document.getElementById('endDateTime').value;
            const participantType = document.getElementById('participantType').value;
            const participantActor = document.getElementById('participantActor').value;

            // Crear el objeto Appointment en formato FHIR
            const appointment = {
                resourceType: "Appointment",
                status: status,
                start: startDateTime,
                end: endDateTime,
                identifier: [{
                    system: identifierSystem,
                    value: identifierValue
                }],
                participant: [{
                    type: [{
                        text: participantType
                    }],
                    actor: {
                        display: participantActor
                    }
                }]
            };

            // Enviar los datos usando Fetch API
            fetch('https://hl7-fhir-ehr-juanita-123.onrender.com/appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(appointment)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Cita médica creada exitosamente!');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Hubo un error al crear la cita.');
            });
        });
    </script>

</body>
</html>
