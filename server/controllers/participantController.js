const {
    BadRequestError,
    NotFoundError,
    UnauthenticatedError,
  } = require("../errors");
  const { StatusCodes } = require("http-status-codes");
const Quiz = require("../models/Quiz");
const Participant = require("../models/Participant");

const createParticipant = async (req, res) => {
    const {identifier} = req.body
    const { quizId } = req.params

    if(!identifier) {
        throw new BadRequestError("An identifier should be added")
    }

    const quiz = await Quiz.findOne({_id: quizId}) 

    if(!quiz) {
        throw new NotFoundError("quiz with id not found")
    }

    const participant = await Participant.create({identifier, quizId})

    res.status(StatusCodes.CREATED).json({msg: "Created"})
}

module.exports = { createParticipant }