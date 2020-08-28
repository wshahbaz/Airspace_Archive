export var quizQuestions = [
    {
        question: "What franchise would you rather play a game from?",
        answers: [
            {
                type: "Microsoft",
                content: "Halo"
            },
            {
                type: "Nintendo",
                content: "Pokemon"
            },
            {
                type: "Sony",
                content: "Uncharted"
            }
        ]
    },
    {
        question: "Which console would you prefer to play with friends?",
        answers: [
            {
                type: "Microsoft",
                content: "X-Box"
            },
            {
                type: "Nintendo",
                content: "Nintendo 64"
            },
            {
                type: "Sony",
                content: "Playstation 1"
            }
        ]
    },
    {
        question: "Which of these racing franchises would you prefer to play a game from?",
        answers: [
            {
                type: "Microsoft",
                content: "Forza"
            },
            {
                type: "Nintendo",
                content: "Mario Kart"
            },
            {
                type: "Sony",
                content: "Gran Turismo"
            }
        ]
    },
    {
        question: "Which of these games do you think is best?",
        answers: [
            {
                type: "Microsoft",
                content: "BioShock"
            },
            {
                type: "Nintendo",
                content: "The Legend of Zelda: Ocarina of Time"
            },
            {
                type: "Sony",
                content: "Final Fantasy VII"
            }
        ]
    },
];

export const qTypes = [
    {
        id: 1,
        question: "Fraction of Domestic vs. International",
        types: ["min", "max"],
        fields: ["airport", "country"],
        endpoint: "",
        answers: [],
        //answers: [
        //  type: "Microsoft",
        //  content: "BioShock"     
        //]
        //ADD THIS FIELD ONCE GETTING A QUESTION
    },
    {
        id: 2,
        question: "Popular place to Visit",
        target: ["Country", "Airport"],
        types: ["min", "max"],
        fields: ["airport", "country"],
        endpoint: "",
        answers: [],
    },
    {
        id: 3,
        question: "Plane Model Information",
        types: [],
        fields: ["plane"],
        endpoint: "",
        answers: [],
    }
]  