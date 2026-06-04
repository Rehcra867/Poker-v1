class HandEvaluator {

    static determineWinner(
        players,
        communityCards
    ) {

        const activePlayers =
            players.filter(
                p => !p.folded
            );

        return activePlayers[0];

    }

}

module.exports =
    HandEvaluator;
