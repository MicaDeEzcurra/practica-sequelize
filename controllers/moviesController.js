const db = require("../database/models/index");
const sequelize = db.sequelize;
const Movie = db.Movie;
const Op = db.Sequelize.Op;

const moviesController = {
  //     index: function(req, res){
  // //mi database en workbench estaba en el localhost: 8889 ==> lo cambie en el file nodemodules
  //         sequelize.query('SELECT * FROM movies') //esto devuelve una promesa
  //         .then(function(results){
  //             let moviesAll = results[0];
  //             // return res.send(moviesAll); ==> con esto chequeo que llegue bien la data al navegador
  //             return res.render('movies', {moviesAll})
  //         })
  //     },

  index: function (req, res) {
    Movie.findAll()
      .then(function (results) {
        let moviesAll = results;

        return res.render("movies", { moviesAll });
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  detail: function (req, res) {
    Movie.findByPk(req.params.id)
      .then(function (results) {
        let movie = results;
        return res.render("detail", { movie });
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  new: function (req, res) {
    Movie.findAll({
      order: [["release_date", "DESC"]],
      limit: 5,
    })
      .then(function (results) {
        let newMovies = results;
        return res.render("new", { newMovies });
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  recommended: function (req, res) {
    Movie.findAll({
      where: {
        rating: { [Op.gte]: 8 },
      },
    })
      .then(function (results) {
        let recommended = results;
        return res.render("recommended", { recommended });
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  search: function (req, res) {
    return res.render("search");
  },

  searchResults: function (req, res) {
    Movie.findAll({
      where: {
        title: { [Op.like]: "%" + req.body.search + "%" },
      },
      order: [
        [req.body.order, 'ASC']
      ]
    })
      .then(function (results) {
        let searchResults = results;
        return res.render("search", { searchResults });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
module.exports = moviesController;
