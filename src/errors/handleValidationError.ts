import mongoose from 'mongoose'
import { ErrorMessage } from '../interfaces/error.interface'

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errors: ErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el.path,
        message: el.message,
      }
    },
  )

  return errors
}

export default handleValidationError
