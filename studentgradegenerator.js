// Challenge 1: This function calculates and returns the grade based on user input of student marks.

function calculateGrade() {
    // Prompt the user to input student marks and convert it to a floating-point number.
    let marks = parseFloat(prompt("Enter student marks (0-100):"));

    // Validate the user input for marks.
    if (isNaN(marks) || marks < 0 || marks > 100) {
        // If the input is invalid, return an error message.
        return "Invalid input. Marks should be between 0 and 100.";
    }

    // Determine the grade based on the given grading criteria.
    if (marks > 79) {
        return "A"; // Return 'A' if marks are greater than 79.
    } else if (marks >= 60) {
        return "B"; // Return 'B' if marks are between 60 and 79 .
    } else if (marks >= 50) {
        return "C"; // Return 'C' if marks are between 50 and 59 .
    } else if (marks >= 40) {
        return "D"; // Return 'D' if marks are between 40 and 49 .
    } else {
        return "E"; // Return 'E' if marks are less than 40.
    }
}


