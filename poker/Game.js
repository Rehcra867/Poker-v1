const Deck = require("./Deck");
const Player = require("./Player");

class Game {

    constructor() {

        this.players = [];

        this.deck = new Deck();

        this.communityCards = [];

        this.pot = 0;

        this.currentTurn = 0;

        this.phase = "waiting";

    }

    addPlayer(
        username,
        chips
    ) {

        this.players.push(
            new Player(
                username,
                chips
            )
        );

    }

    start() {

        this.deck.shuffle();

        this.phase = "preflop";

        for (
            let i = 0;
            i < 2;
            i++
        ) {

            this.players.forEach(
                player => {

                    player.hand.push(
                        this.deck.deal()
                    );

                }
            );

        }

    }

    flop() {

        this.communityCards.push(
            this.deck.deal()
        );

        this.communityCards.push(
            this.deck.deal()
        );

        this.communityCards.push(
            this.deck.deal()
        );

        this.phase = "flop";

    }

    turn() {

        this.communityCards.push(
            this.deck.deal()
        );

        this.phase = "turn";

    }

    river() {

        this.communityCards.push(
            this.deck.deal()
        );

        this.phase = "river";

    }

}

module.exports = Game;
