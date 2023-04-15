export const MONGODB_PORTFOLIO_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.hlsuk1v.mongodb.net/${process.env.MONGODB_DATABASE_PORTFOLIO}?retryWrites=true&w=majority`;
export const MONGODB_FINANCE_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.hlsuk1v.mongodb.net/${process.env.MONGODB_DATABASE_FINANCE}?retryWrites=true&w=majority`;
export const MONGODB_USERS_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.hlsuk1v.mongodb.net/${process.env.MONGODB_DATABASE_USERS}?retryWrites=true&w=majority`;
