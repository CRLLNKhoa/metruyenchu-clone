const UserRouter = require("./userRouter")
const GenreRouter = require("../routers/genreRouter")
const StoryRouter = require("./storyRouter")
const AuthorRouter = require("./authorRouter")
const ChapterRouter = require("./chapterRouter")
const CommentRouter = require("./commentRouter")
const PaymentRouter = require("./paymentRouter")

const routes = (app) => {
    app.use("/api/user", UserRouter)
    app.use("/api/genre", GenreRouter)
    app.use("/api/author", AuthorRouter)
    app.use("/api/story", StoryRouter)
    app.use("/api/chapter", ChapterRouter)
    app.use("/api/comment", CommentRouter)
    app.use("/api/payment", PaymentRouter)
}

module.exports = routes