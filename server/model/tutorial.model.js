const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TutorialSchema = new Schema({
    title: String,
    description: String,
    published: Boolean
  },
  { timestamps: true });

  TutorialSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  
const TutorialModel = mongoose.model('tutorial', TutorialSchema);

module.exports = TutorialModel;
