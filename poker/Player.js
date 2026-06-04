class Player {

    constructor(username, chips) {

        this.username = username;

        this.chips = chips;

        this.hand = [];

        this.folded = false;

        this.currentBet = 0;

    }

}

module.exports = Player;
