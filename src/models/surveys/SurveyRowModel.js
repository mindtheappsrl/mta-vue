export default class SurveyRowModel {
  constructor(row) {
    this.id =
      row && Object.prototype.hasOwnProperty.call(row, 'id') ? row.id : null
    this.surveyId =
      row && Object.prototype.hasOwnProperty.call(row, 'surveyId')
        ? row.surveyId
        : null
    this.surveyRowTypeId =
      row && Object.prototype.hasOwnProperty.call(row, 'surveyRowTypeId')
        ? row.surveyRowTypeId
        : null
    this.customTypeId =
      row && Object.prototype.hasOwnProperty.call(row, 'customTypeId')
        ? row.customTypeId
        : null
    this.ownerId =
      row && Object.prototype.hasOwnProperty.call(row, 'ownerId')
        ? row.ownerId
        : null
    this.bitCustomType =
      row && Object.prototype.hasOwnProperty.call(row, 'bitCustomType')
        ? row.bitCustomType
        : false
    this.isVisibleToOperator =
      row && Object.prototype.hasOwnProperty.call(row, 'isVisibleToOperator')
        ? row.isVisibleToOperator
        : false
    this.rowTypeCode =
      row && Object.prototype.hasOwnProperty.call(row, 'rowTypeCode')
        ? row.rowTypeCode
        : 0
    this.code =
      row && Object.prototype.hasOwnProperty.call(row, 'code') ? row.code : 0
    this.rowOrder =
      row && Object.prototype.hasOwnProperty.call(row, 'rowOrder')
        ? row.rowOrder
        : 0
    this.title =
      row && Object.prototype.hasOwnProperty.call(row, 'title') ? row.title : ''
    this.isRequired =
      row && Object.prototype.hasOwnProperty.call(row, 'isRequired')
        ? row.isRequired
        : false
    this.answersList =
      row && Object.prototype.hasOwnProperty.call(row, 'answersList')
        ? row.answersList
        : []
    this.surveyRowTextCode =
        row && Object.prototype.hasOwnProperty.call(row, 'surveyRowTextCode')
          ? row.surveyRowTextCode
          : null
  }
}
