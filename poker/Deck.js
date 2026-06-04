const Card = require("./Card");

class Deck {

    constructor() {

        this.cards = [];

        const suits = [
            "♠",
            "♥",
            "♦",
            "♣"
        ];

        const ranks = [
            "2","3","4","5",
            "6","7","8","9",
            "10","J","Q","K","A"
        ];

        for (const suit of suits) {

            for (const rank of ranks) {

                this.cards.push(
                    new Card(rank, suit)
                );

            }

        }

    }

    shuffle() {

        for (
            let i = this.cards.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );

            [
                this.cards[i],
                this.cards[j]
            ] = [
                this.cards[j],
                this.cards[i]
            ];

        }

    }

    deal() {

        return this.cards.pop();

    }

}

module.exports = Deck;
