const clarifai = require("clarifai");

const clarifaiApp = new clarifai.App({
  apiKey: "af977778b13042c9b49be6c596dc87c9",
});
const handelImgaeurl = (req, res) => {
  const { imageurl } = req.body;
  clarifaiApp.models
    .predict(Clarifai.FACE_DETECT_MODEL, imageurl)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

module.exports={
    handelImgaeurl
}
