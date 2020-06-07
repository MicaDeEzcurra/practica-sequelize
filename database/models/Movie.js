module.exports = (sequelize, dataTypes) => {
 
    const alias = "Movie"; //tengo que ponerlo en singular, para que sequelize le agregue una 'S', entonces buscara la tabla 'movies'
    const cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: dataTypes.STRING,
      rating: dataTypes.INTEGER,
      awards: dataTypes.INTEGER,
      length: dataTypes.INTEGER,
      release_date: dataTypes.DATE
    };
    const config = {
        timestamps :true //cchequear tambien si los campos de MySQL estan con CamelCase o guion_bajo
    }

    const Movie = sequelize.define(alias, cols, config);
    
    return Movie;
}