import SurveyRowModel from "./SurveyRowModel";

export default class SurveyDetailModel {
  constructor(survey) {
    this.id =
      survey && Object.prototype.hasOwnProperty.call(survey, 'id')
        ? survey.id
        : null
    this.code =
      survey && Object.prototype.hasOwnProperty.call(survey, 'code')
        ? survey.code
        : ''
    this.name =
      survey && Object.prototype.hasOwnProperty.call(survey, 'name')
        ? survey.name
        : ''
    this.surveys =
      survey && Object.prototype.hasOwnProperty.call(survey, 'surveys')
        ? Array.from<SurveyRowModel>(survey.surveys)
        : []
  }
}
