
class Physicist{
    name = null;
    birthYear = null;
    birthPlace = null;
    comments = null;

    constructor(name, birthYear, birthPlace, comments){
        this.name = name;
        this.birthYear = birthYear;
        this.birthPlace = birthPlace;
        this.comments = comments;
    }

    update(birthYear, birthPlace, comments){
        this.birthYear = birthYear;
        this.birthPlace = birthPlace;
        this.comments = comments;
    }
};

(function(exports){
    exports.Physicist = Physicist;  
}(typeof exports === 'undefined' ? this : exports));