document.addEventListener("DOMContentLoaded", function () {
    const quizSection = document.getElementById("quiz-section");
    const certificateSection = document.getElementById("certificate-section");
    const submitButton = document.getElementById("submit-quiz");
    const downloadButton = document.getElementById("download-pdf");
    const certificateIframe = document.getElementById("certificate-pdf");

    submitButton.addEventListener("click", function () {
        const userName = document.getElementById("name").value.trim();
        if (!userName) {
            alert("Please enter your name.");
            return;
        }

        // Correct answers
        const answers = {
            q1: "4",
            q2: "San Jose" // Fix incorrect answer value
        };

        let correctCount = 0;
        let totalQuestions = Object.keys(answers).length;

        Object.keys(answers).forEach(q => {
            const selected = document.querySelector(`input[name="${q}"]:checked`);
            if (selected && selected.value === answers[q]) {
                correctCount++;
            }
        });

        const scorePercent = (correctCount / totalQuestions) * 100;
        document.getElementById("cert-name").innerText = userName;
        document.getElementById("cert-score").innerText = scorePercent.toFixed(0);
        document.getElementById("cert-date").innerText = new Date().toLocaleDateString();

        quizSection.style.display = "none";
        certificateSection.style.display = "block";
    });

    downloadButton.addEventListener("click", function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const userName = document.getElementById("cert-name").innerText;
        const score = document.getElementById("cert-score").innerText;
        const date = document.getElementById("cert-date").innerText;

        doc.setFontSize(22);
        doc.text("Certificate of Completion", 20, 30);
        doc.setFontSize(16);
        doc.text(`Awarded to: ${userName}`, 20, 50);
        doc.text(`Score: ${score}%`, 20, 70);
        doc.text(`Date: ${date}`, 20, 90);

        // Display PDF in iframe
        const pdfDataUri = doc.output("datauristring");
        certificateIframe.src = pdfDataUri;

        // Download the certificate
        doc.save("certificate.pdf");
    });
});