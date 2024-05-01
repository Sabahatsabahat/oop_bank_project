import inquirer from "inquirer";
import chalk from "chalk";

// Define a class for bank account
class BankAccount {
    private balance: number;

    constructor(initialBalance: number) {
        this.balance = initialBalance;
    }

    // Method to deposit money into the account
    deposit(amount: number): void {
        this.balance += amount;
        console.log(chalk.green(`Deposited ${amount} into your account.`));
        this.showBalance();
    }

    // Method to withdraw money from the account
    withdraw(amount: number): void {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(chalk.yellow(`Withdrawn ${amount} from your account.`));
            this.showBalance();
        } else {
            console.log(chalk.red("Insufficient funds!"));
        }
    }

    // Method to display the current balance
    showBalance(): void {
        console.log(chalk.blue(`Your current balance is: ${this.balance}`));
    }
}

// Function to start bank operations
async function startBankOperation(account: BankAccount): Promise<void> {
    const operation = await inquirer.prompt({
        type: "list",
        name: "action",
        message: chalk.cyan("What would you like to do?"),
        choices: [chalk.green("Deposit"), chalk.yellow("Withdraw"), chalk.blue("Check Balance"), chalk.red("Exit")]
    });

    switch (operation.action) {
        case chalk.green("Deposit"):
            const depositAmount = await inquirer.prompt({
                type: "number",
                name: "amount",
                message: chalk.green("Enter the amount to deposit:")
            });
            account.deposit(depositAmount.amount);
            break;
        case chalk.yellow("Withdraw"):
            const withdrawAmount = await inquirer.prompt({
                type: "number",
                name: "amount",
                message: chalk.yellow("Enter the amount to withdraw:")
            });
            account.withdraw(withdrawAmount.amount);
            break;
        case chalk.blue("Check Balance"):
            account.showBalance();
            break;
        case chalk.red("Exit"):
            console.log(chalk.magenta("Thank you for banking with us!"));
            return;
    }

    // Recursively call the function to continue banking operations
    startBankOperation(account);
}

// Initialize a bank account with an initial balance of 0
const account = new BankAccount(0);

// Start banking operations
startBankOperation(account);
