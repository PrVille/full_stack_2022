import Part from "./Part"
import { CoursePart } from "../Types"

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      {courseParts.map((part, i) => {
        return <Part key={i} coursePart={part} />
      })}
    </div>
  )
}

export default Content
