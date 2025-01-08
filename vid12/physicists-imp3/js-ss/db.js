const Physicist = require('../src/js-common/physicist').Physicist;

class Db{
    physicists = null;
    
    constructor(){
        this.physicists = [
            new Physicist("Albert Einstein", 1879, "Ulm, Germany", "Theory of relativity and E=mc^2" ),
            new Physicist("James Clerk Maxwell", 1831, "Edinburgh, Scotland", "Maxwell's equations (electromagnetism)"),
            new Physicist("Isaac Newton", 1643, "Woolsthorpe, England", "Foundation of classical mechanics and gravity")];
    }

    getByName(name){
        const idx = this.physicists.findIndex(ph => ph.name == name);
        if( (idx >= 0) && (idx < this.physicists.length) ){
            return this.physicists[idx];
        }else{
            return null;
        }
    }
    
    update(phNew){
        if(!phNew.name){
            // bnr.addErr(`${name}" is not a valid physicist  name!`);
            throw new Error(`physicist name cannot be empty!`);
        }
        const phOld = this.getByName(phNew.name);
        if(phOld){
            phOld.update(phNew.birthYear, phNew.birthPlace, phNew.comments);
        }else{
            this.physicists.push(phNew);
        }
    }

    delete(name){
        const idx = this.physicists.findIndex(ph => ph.name == name);
        if( (idx >= 0) && (idx < this.physicists.length) ){
            this.physicists.splice(idx, 1);
        }else{
            throw new Error(`physicist (${name}) not found in the db!`);
        }
    }

    all(){
        return this.physicists;
    }
};

exports.Db = Db;