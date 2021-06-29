export default function(event) {
  this.id = event ? event.id : null;
  this.title = event ? event.title : null;
  this.subtitle = event ? event.subtitle : null;
  this.start = event ? event.start : null;
  this.end = event ? event.end : null;
  this.color = event ? event.color : null;
  this.isChecked = event ? event.isChecked : false;
  this.extra = event ? event.extra : null;
  this.category = event ? event.category : null;
  this.timed = event ? event.timed : true;
  for (var prop in event) {
    Object.prototype.hasOwnProperty.call(event, prop)
      ? (this[prop] = event[prop])
      : null;
  }
}
