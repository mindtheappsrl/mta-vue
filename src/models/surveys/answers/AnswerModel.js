export default function(answer) {
  this.answerId =
    answer && Object.prototype.hasOwnProperty.call(answer, 'answerId')
      ? answer.answerId
      : null
  this.surveyRowTypeCode =
    answer && Object.prototype.hasOwnProperty.call(answer, 'surveyRowTypeCode')
      ? answer.surveyRowTypeCode
      : null
  this.value =
    answer && Object.prototype.hasOwnProperty.call(answer, 'value')
      ? answer.value
      : ''
  this.thumbUrl =
    answer && Object.prototype.hasOwnProperty.call(answer, 'thumbUrl')
      ? answer.thumbUrl
      : null
  this.attribute =
    answer && Object.prototype.hasOwnProperty.call(answer, 'attribute')
      ? answer.attribute
      : null
  this.answerOrder =
    answer && Object.prototype.hasOwnProperty.call(answer, 'answerOrder')
      ? answer.answerOrder
      : 0
  this.answerAdminSurvey =
    answer && Object.prototype.hasOwnProperty.call(answer, 'answerAdminSurvey')
      ? answer.answerAdminSurvey
      : undefined
}
