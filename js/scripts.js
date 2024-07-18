document.addEventListener('DOMContentLoaded', () => {
    // Get DOM element references
    const bmiForm = document.getElementById('form-bmi');
    const resultSection = document.getElementById('result-section');
    const resultArticleUnderweight = document.getElementById('result-underweight');
    const generalInfoUnderweight = document.getElementById('info-underweight');
    const resultArticleNormal = document.getElementById('result-normal');
    const generalInfoNormal = document.getElementById('info-normal');
    const resultArticleOverweight = document.getElementById('result-overweight');
    const generalInfoOverweight = document.getElementById('info-overweight');
    const bmiValueElement = document.getElementById('value-bmi');
    const footer = document.getElementById('app-footer');
    const bmiCategoryElement = document.getElementById('category-bmi');

    // Function to display results based on BMI value and category
    const displayResult = (bmi, category, showUnderweight, showNormal, showOverweight) => {
        bmiValueElement.textContent = bmi.toFixed(2); // Display BMI value
        bmiCategoryElement.textContent = category; // Display BMI category

        // Display result section and footer
        resultSection.style.display = 'block';
        footer.style.display = 'block';

        // Show or hide result articles and general info based on category
        resultArticleUnderweight.style.display = showUnderweight ? 'block' : 'none';
        generalInfoUnderweight.style.display = showUnderweight ? 'block' : 'none';
        resultArticleNormal.style.display = showNormal ? 'block' : 'none';
        generalInfoNormal.style.display = showNormal ? 'block' : 'none';
        resultArticleOverweight.style.display = showOverweight ? 'block' : 'none';
        generalInfoOverweight.style.display = showOverweight ? 'block' : 'none';
    };

    // Function to calculate BMI
    const calculateBMI = (event) => {
        event.preventDefault(); // Prevent default form submission

        const weight = parseFloat(document.getElementById('weight-input').value); // Get weight from input
        const height = parseFloat(document.getElementById('height-input').value) / 100; // Get height from input and convert to meters
        
        // Validate input
        if (isNaN(weight) || isNaN(height) || height === 0) {
            alert('Please enter valid values for weight and height.');
            return;
        }

        const bmi = weight / (height * height); // Calculate BMI
        let category = '';

        // Determine BMI category and display corresponding result
        if (bmi < 18.50) {
            category = 'Anda kekurangan berat badan';
            displayResult(bmi, category, true, false, false);
        } else if (bmi >= 18.50 && bmi <= 24.99) {
            category = 'Anda memiliki berat badan ideal';
            displayResult(bmi, category, false, true, false);
        } else {
            category = 'Anda berada dalam kategori obesitas';
            displayResult(bmi, category, false, false, true);
        }
    };

    // Function to reset the form
    const resetForm = () => {
        resultSection.style.display = "none"; // Hide result section
        footer.style.display = "none"; // Hide footer
        const resultArticles = document.querySelectorAll(".result-article"); // Get all result articles
        const generalInfos = document.querySelectorAll(".general-info"); // Get all general info
        resultArticles.forEach(article => article.style.display = "none"); // Hide all result articles
        generalInfos.forEach(info => info.style.display = "none"); // Hide all general info
    };

    // Add event listener for form submission
    bmiForm.addEventListener('submit', calculateBMI);
    
    // Add event listener for reset button
    const resetButton = document.querySelector(".reset-btn");
    resetButton.addEventListener("click", resetForm);
});