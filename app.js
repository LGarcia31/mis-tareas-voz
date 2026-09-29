const btnVoz = document.getElementById('btn-voz');
const listaTareas = document.getElementById('lista-tareas');

// Configuración del Reconocimiento de Voz
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new Recognition();
recognition.lang = 'es-ES';

// Configuración de la Síntesis de Voz (Habla)
const hablar = (texto) => {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES';
    window.speechSynthesis.speak(utterance);
};

btnVoz.onclick = () => {
    recognition.start();
    btnVoz.textContent = "Escuchando...";
};

recognition.onresult = (event) => {
    const texto = event.results[0][0].transcript.toLowerCase();
    btnVoz.textContent = "🎤 Hablar";
    
    if (texto.includes("añadir") || texto.includes("agregar")) {
        const tarea = texto.replace("añadir", "").replace("agregar", "").trim();
        agregarTarea(tarea);
        hablar(`He añadido ${tarea} a tu lista`);
    } else if (texto.includes("borrar todo")) {
        listaTareas.innerHTML = "";
        hablar("He borrado todas las tareas");
    } else {
        hablar("No entendí el comando. Di añadir seguido de la tarea");
    }
};

function agregarTarea(texto) {
    const li = document.createElement('li');
    li.textContent = texto;
    listaTareas.appendChild(li);
}
