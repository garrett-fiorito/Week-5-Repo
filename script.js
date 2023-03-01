class Developer { // Blueprint for each developer on a a team
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }

    describe() {
        return `${this.name} works as a ${this.position}.`;
    }
}

class Team { // Blueprint for each team
    constructor(name) {
        this.name = name;
        this.developers = [];
    }
    addDeveloper(developer) { // Method to add a dev to a team 
        if (developer instanceof Developer) { // Ensures the added dev is indeed a dev
            this.developers.push(developer);
        } else {
            throw new Error (`Only instances of Developer can be added. Argument is not a dev: ${developer}.`);
        }
    }

    describe() {
        return `${this.name} has ${this.developers.length} team members.`;
    }
}

class Menu {
    constructor() {
        this.teams = [];
        this.selectedTeam = null;
    }

    start() { // Drives the functionality of the menu
        let selection = this.showMainMenuOptions(); // Selection is initialized with whatever is returned from showMainMenuOptions

        while (selection != 0) { // Waits for user input and executes until 0 is selected
            switch(selection) {
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4':
                    this.displayTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions(); // Called again to prompt for more user input
        }
        alert ('Goodbye');

    }

    showMainMenuOptions() { // MAIN MENU
        return prompt(`
        0) exit
        1) create new team
        2) view team
        3) delete team
        4) show all teams
        `);
    }

    showTeamMenuOptions(teamInfo) { // TEAM SUB-MENU
        return prompt(`
        0) back
        1) create developer
        2) delete developer
        --------------------
        ${teamInfo}
        `);
    }

    displayTeams() {
        let teamString = '';
        for (let i = 0; i < this.teams.length; i++) { // Iterate through all teams that exist
            teamString += i + ') ' + this.teams[i].name + '\n' // Shows all teams with an index and each on a new line.
        }
        alert(teamString);
    }
    createTeam() {
        let name = prompt('Enter name for new team: ');
        this.teams.push(new Team(name)) // Creates a new team instance using the name from the prompt 
    }

    viewTeam() {
        let index = prompt('Enter the index of the team you would like to view: ');
        if (index > -1 && index < this.teams.length) { // Input validation
            this.selectedTeam = this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name + '\n';

            for (let i = 0; i < this.selectedTeam.developers.length; i++) {
                description += i + ') ' + this.selectedTeam.developers[i].name + ' - ' + this.selectedTeam.developers[i].position + '\n';
            }

            let selection = this.showTeamMenuOptions(description) // Display teams and show all options
            switch (selection) { // Sub menu of the full menu
                case '1':
                    this.createDeveloper();
                    break;
                case '2': 
                    this.deleteDeveloper();
            }
        }
    }

    deleteTeam() {
        let index = prompt('Enter the index of the team you wish to delete: ')
        if (index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
    }

    createDeveloper() {
        let name = prompt('Enter name for new developer: ');
        let position = prompt('Enter position for new developer: ')
        this.selectedTeam.developers.push(new Developer(name, position));
    }
    deleteDeveloper() {
        let index = prompt('Enter the index of the developer you wish to delete: ')
        if (index > -1 && index < this.selectedTeam.developers.length) {
            this.selectedTeam.developers.splice(index, 1); // Removes the element at the input index
        }
    }

}

let menu = new Menu(); // Instance of the menu
menu.start(); // start is the method that shows the main menu options
