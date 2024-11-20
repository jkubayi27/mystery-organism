// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//, create a factory function pAequorFactory() that has two parameters:
const pAequorFactory = (orgNum,dnaBases) => {
  return {
    specimenNum : orgNum,
    dna : dnaBases,
    //To simulate a mutation, in pAequorFactory()‘s returned object, add the method .mutate().
    mutate(){
      let dnaIndex = Math.floor(Math.random() * 4); 
      let mDNA = this.dna;
      let randBase = returnRandBase();
      while (randBase === mDNA[dnaIndex]){
        randBase = returnRandBase;
      }
      mDNA[dnaIndex] = randBase;
      return mDNA;
    }, //The behavior of .compareDNA() is to compare the current pAequor‘s .dna with the passed in pAequor‘s .dna
    compareDNA(pAequor){
      let currentDNA = this.dna;
      let match = 0;
      let passedDNA = pAequor.dna;
      for (let i=0; i < 15;i++){
        if (currentDNA[i] === passedDNA[i]){
          match++;
        }
      }
      let percentage = match/15 * 100;
      console.log(`${this.specimenNum} and ${pAequor.specimenNum} have ${Math.floor(percentage)}% DNA in common`);
    },//add another method .willLikelySurvive()..willLikelySurvive() returns true if the object’s .
      //dna array contains at least 60% 'C' or 'G' bases.
      willLikelySurvive(){
        let sBases = 0;
        let chances = false;
        for (i=0; i < 15;i++){
          if(this.dna[i] === 'C' || this.dna[i] === 'G'){
            sBases++;
          }
        }
        let percentage = Math.floor(sBases/15 * 100);
        if (percentage >= 60){
          chances = true;
        } else{
          chances = false;
        }
        return chances;
      },//Create a .complementStrand() method to the factory function’s object that returns the complementary DNA strand.
      complementStrand(){
        let cStrand = []; 
        for (let i=0; i < this.dna.length;i++){
          let nBase = this.dna[i];
          if (nBase === 'A'){
            nBase = 'T';
          } else if (nBase === 'C'){
            nBase = 'G';
          } else if (nBase === 'T'){
            nBase = 'A';
          } else if (nBase === 'G'){
            nBase = 'C';
          }
          cStrand.push(nBase);
        }
        return cStrand;
      }
  }
}
let org1 = pAequorFactory(1,mockUpStrand());
let org2 = pAequorFactory(2,mockUpStrand());
//With the factory function set up, your team requests that you create 30 instances of pAequor that can survive in their natural environment. 
//Store these instances in an array for your team to study later.
const find30 = () => {
  let instances = 0;
  let arr = [];
  while (instances < 3){
    let i = 1;
    let instance = pAequorFactory(i,mockUpStrand());
    if (instance.willLikelySurvive() === true){
      instances++;
      arr.push(instance.dna);
    }
  }
  return arr;
}
console.log(org1.dna);
console.log(org1.complementStrand());
//console.log(find30());