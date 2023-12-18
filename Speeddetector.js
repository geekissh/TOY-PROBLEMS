// Challenge 2: This function calculates and returns demerit points based on the input speed of a car.

function calculateDemeritPoints(speed) {
    // Constants for the speed limit and demerit points per 5 km/h over the limit.
    const speedLimit = 70;
    const demeritPointsPer5Km = 1;

    // Check if the spedd is within the allowed limit.If the speed is below the limit, return "Ok".
    if (speed < speedLimit) {
        return "Ok";
    }

    // Calculate demerit points based on the difference between the speed and the limit.
    let demeritPoints = Math.floor((speed - speedLimit) / 5);

    // Check if the demerit points exceed the allowed limit for license suspension.
    if (demeritPoints > 12) {
        // If demerit points are over 12, return "License suspended".
        return "License suspended";
    }

    // Return the calculated demerit points as a string.
    return "Points: " + demeritPoints;
}

// Prompt the user to enter the speed of the car and convert it to a floating-point number.
let speedInput = parseFloat(prompt("Enter the speed of the car:"));

// Validate the user input for the speed.
if (isNaN(speedInput) || speedInput < 0) {
    // If the input is invalid, error message to the console.If the input is valid, calculate and log the demerit points to the console.
    console.log("Invalid input. Speed should be a positive number.");
} else {
    console.log(calculateDemeritPoints(speedInput));
}
