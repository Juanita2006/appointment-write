document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const status = document.getElementById('appointmentStatus').value;
    const startDateTime = document.getElementById('startDateTime').value;
    const endDateTime = document.getElementById('endDateTime').value;
    const identifierSystem = document.getElementById('identifierSystem').value;
    const identifierValue = document.getElementById('identifierValue').value;

    const participantType = document.getElementById('participantType').value;
    const participantActor = document.getElementById('participantActor').value;

    // Crear el objeto Appointment en formato FHIR
    const appointment = {
        resourceType: "Appointment",
        status: status,
        start: new Date(startDateTime).toISOString(),
        end: new Date(endDateTime).toISOString(),
        identifier: [{
            system: identifierSystem,
            value: identifierValue
        }],
        participant: [{
            type: [{ text: participantType }],
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
        console.log('Éxito:', data);
        alert('¡Cita creada exitosamente!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un error al crear la cita.');
    });
});



