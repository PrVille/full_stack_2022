import { CoursePart } from "../Types"

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case "normal": {
      return (
        <div>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <p>{coursePart.description}</p>
        </div>
      )
    }
    case "groupProject": {
      return (
        <div>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <p>{coursePart.groupProjectCount}</p>
        </div>
      )
    }
    case "submission": {
      return (
        <div>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <p>{coursePart.description}</p>

          <p>{coursePart.exerciseSubmissionLink}</p>
        </div>
      )
    }
    case "special": {
      return (
        <div>
          <h4>
            {coursePart.name} {coursePart.exerciseCount}
          </h4>
          <p>{coursePart.description}</p>

          <p>{coursePart.requirements.join(", ")}</p>
        </div>
      )
    }
    default:
      return assertNever(coursePart)
  }
}

export default Part
