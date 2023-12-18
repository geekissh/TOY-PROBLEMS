// Challenge 3: This class represents a Net Salary Calculator, which calculates net salary based on input parameters.
class NetSalaryCalculator {
    // Constructor to initialize the instance with basic salary and benefits.
    constructor(basicSalary, benefits) {
        this.basicSalary = basicSalary; // Initial basic salary
        this.benefits = benefits; // Initial benefits

        // Tax rates for PAYE (Pay As You Earn) in different income brackets.
        this.taxRates = {
            paye: [
                { lowerLimit: 0, upperLimit: 24000, rate: 10 },
                { lowerLimit: 24001, upperLimit: 32333, rate: 25 },
                { lowerLimit: 32334, upperLimit: 500000, rate: 30 },
                { lowerLimit: 500001, upperLimit: 800000, rate: 32.5 },
                { lowerLimit: 800001, upperLimit: Infinity, rate: 35 }
            ]
        };

        // Parameters used in the PAYE calculation.
        this.payeParameters = {
            personalRelief: 2400,
            insuranceRelief: 5000,
            pensionFundContribution: 20000,
            hospContribution: 0,
            housingRelief: 9000,
            ownerOccupierInterest: 25000,
            disabilityExemption: 150000
        };

        // NHIF deduction rates based on gross pay.
        this.nhifRates = [
            { lowerLimit: 0, upperLimit: 5999, deduction: 150 },
            { lowerLimit: 6000, upperLimit: 7999, deduction: 300 },
            { lowerLimit: 8000, upperLimit: 11999, deduction: 400 },
            { lowerLimit: 12000, upperLimit: 14999, deduction: 500},
            { lowerLimit: 15000, upperLimit: 19999, deduction: 600},
            { lowerLimit: 20000, upperLimit: 24999, deduction: 750},
        ];

        // NSSF contribution rates for Tier I and Tier II.
        this.nssfRates = {
            tierI: { lowerLimit: 0, upperLimit: 6000, contribution: 0.06 },
            tierII: { lowerLimit: 6001, upperLimit: 18000, contribution: 0.06 }
        };

        // Housing Levy rate.
        this.housingLevyRate = 0.015;
    }

    // Method to calculate the net salary based on the provided parameters.
    calculateNetSalary() {
        const grossSalary = this.basicSalary + this.benefits;

        // Calculate PAYE, NHIF, NSSF, and Housing Levy contributions.
        const paye = this.calculatePAYE(grossSalary);
        const nhif = this.calculateNHIF(grossSalary);
        const nssf = this.calculateNSSF();
        const housingLevy = this.calculateHousingLevy(grossSalary);

        // Calculate the net salary by subtracting deductions from the gross salary.
        const netSalary = grossSalary - (paye + nhif + nssf + housingLevy);

        // Return an object containing details of the salary components.
        return {
            grossSalary,
            paye,
            nhif,
            nssf,
            housingLevy,
            netSalary
        };
    }

    // Method to calculate PAYE (Pay As You Earn) tax.
    calculatePAYE(grossSalary) {
        let paye = 0;

        // Iterate through PAYE tax rate brackets and calculate the tax.
        for (const rate of this.taxRates.paye) {
            if (grossSalary > rate.lowerLimit && grossSalary <= rate.upperLimit) {
                paye = (grossSalary - rate.lowerLimit) * (rate.rate / 100);
                break;
            }
        }

        // Apply PAYE parameters such as personal relief, insurance relief, and pension fund contribution.
        paye -= this.payeParameters.personalRelief;
        paye -= this.payeParameters.insuranceRelief;
        paye -= this.payeParameters.pensionFundContribution;

        // Ensure PAYE is not negative.
        return Math.max(0, paye);
    }

    // Method to calculate NHIF deductions.
    calculateNHIF(grossSalary) {
        // Iterate through NHIF deduction rate tiers and return the applicable deduction.
        for (const tier of this.nhifRates) {
            if (grossSalary > tier.lowerLimit && grossSalary <= tier.upperLimit) {
                return tier.deduction;
            }
        }

        // Return 0 if no match is found.
        return 0;
    }

    // Method to calculate NSSF contributions. Calculate contributions for both Tier I and Tier II.
    calculateNSSF() {
       
        const nssfTierI = this.basicSalary * this.nssfRates.tierI.contribution;
        const nssfTierII = Math.min(
            (this.benefits + this.basicSalary - this.nssfRates.tierII.lowerLimit) * this.nssfRates.tierII.contribution,
            this.nssfRates.tierII.upperLimit * this.nssfRates.tierII.contribution
        );

        // Return the total NSSF contributions.
        return nssfTierI + nssfTierII;
    }

    // Method to calculate Housing Levy contributions. Calculate Housing Levy based on the specified rate.
    calculateHousingLevy(grossSalary) {
        return grossSalary * this.housingLevyRate;
    }
}

// Prompt the user to input basic salary and benefits.
const basicSalary = parseFloat(prompt("Enter basic salary:"));
const benefits = parseFloat(prompt("Enter benefits:"));

// Validate the user input for basic salary and benefits.
if (isNaN(basicSalary) || isNaN(benefits) || basicSalary < 0 || benefits < 0) {
    console.log("Invalid input. Salary and benefits should be non-negative numbers.");
} else {
    // Create an instance of the NetSalaryCalculator class.Calculate and display the net salary details.
    const salaryCalculator = new NetSalaryCalculator(basicSalary, benefits);
    const salaryDetails = salaryCalculator.calculateNetSalary();
    console.log("Net Salary Details:", salaryDetails);
}
