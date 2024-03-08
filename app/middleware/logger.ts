import morgan from 'morgan'
const simple = ':method :url :status :res[content-length] - :response-time ms'
export const morganLogs = morgan(process.env.NODE_ENV === "development" ? simple : 'combined')
