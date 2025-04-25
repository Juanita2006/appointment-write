document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const identifierSystem = document.getElementById('identifierSystem').value;
    const identifierValue = document.getElementById('identifierValue').value;
    const status = document.getElementById('status').value;
    const startDateTime = document.getElementById('startDateTime').value;
    const endDateTime = document.getElementById('endDateTime').value;
    const participantType = document.getElementById('participantType').value;
    const participantActor = document.getElementById('participantActor').value;

    // Crear el objeto Appointment en formato FHIR
const appointment = {
  "resourceType": "Encounter",
  "status": "status",  // Estado dinámico
  "identifier": [
    {
      "system": "identifierSystem",  // Sistema dinámico
      "value": "identifierValue"  // Valor dinámico
    }
  ],
  "subject": {
    "reference": "Patient/patientId"  // ID de paciente dinámico
  },
  "participant": [
    {
      "type": [
        {
          "text": "participantType"  // Tipo de participante dinámico
        }
      ]
    }
  ]
}
   

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
        alert('Hubo un error al crear la cita médica.');
    });
});






