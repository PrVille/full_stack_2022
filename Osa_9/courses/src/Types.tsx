export interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

export interface CourseDescriptionExtension extends CoursePartBase {
  description: string
}

export interface CourseNormalPart extends CourseDescriptionExtension {
  type: "normal"
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject"
  groupProjectCount: number
}

export interface CourseSubmissionPart extends CourseDescriptionExtension {
  type: "submission"
  exerciseSubmissionLink: string
}

export interface CourseSpecialPart extends CourseDescriptionExtension {
  type: "special"
  requirements: Array<string>
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart
