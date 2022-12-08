import path from "node:path"
import {createHash} from 'node:crypto'

export class Utils{
    
    resolve(pathFromProjectHome){
        return path.resolve('./').split('Sasquatch/Sasquatch')[0]+'Sasquatch/Sasquatch/'+pathFromProjectHome
    }
    hash(anything){
		return createHash('sha256').update(anything).digest('hex');
	}

    nNeighborhoods(uniqueChars, dimension){
        var r = uniqueChars
        var nNeighborhoods=0
        for(var n = dimension; n<=2*dimension; n++){
            nNeighborhoods+=(this.factorial((n+r-1)))/(this.factorial(n)*this.factorial(r-1))
        }
        return nNeighborhoods
    }
    factorial (n) {
        //https://stackoverflow.com/questions/3959211/what-is-the-fastest-factorial-function-in-javascript
        if (n === 0)
        { return 1; }
        else
        { return n * this.factorial( n - 1 ); }
    }


    symbols(symbols){
        var symbol = symbols.shift()
        symbols.push(symbol)
        return symbols
    }
   
    _reset(symbols, val, arr, i){
        //reseting from the significant index for arr to val
        for(var j = i; j<arr.length; j++){
            arr[j]=val
        }
        return arr
    }

    shiftLeft(list){
        var symbol = list.shift()
        list.push(symbol)
        return list
    }
    shiftRight(list){
        var symbol = list.pop()
        list.unshift(symbol)
        return list
    }
    swap(i, j, list){
        list=list.slice()
        var b = list[i];
        list[i] = list[j];
        list[j] = b;
        return list
    }

    //PERMUTATION WITHOUT REPETITION
    PwithoutR(symbols, n, out=[]){
        var withReps = this.PwithR(symbols, n, out)
        console.log(withReps)
    }

    //COMBINATION WITH REPETITION
    CwithR(symbols, n, out=[]){
        while(true){
            if(out.length==0){
                var next=[]
                for(var k = 0; k<n; k++){next.push(symbols[symbols.length-1])}
                out.unshift(next)
            }
            if(out[0][0]==symbols[0]){return out}
            var next=out[0].slice()
            for(var j =n-1; j>=0; j--){
                if(next[j]!=symbols[0]){
                    next[j]=symbols[symbols.indexOf(next[j])-1]
                    next = this._reset(symbols, symbols[symbols.indexOf(next[j])], next, j)
                    out.unshift(next)
                    break
                }
            }
        }
    }
    //where n is the number of symbols, 
    //and r is the number of symbols chosen 
    _PwithoutR(n, r){
        if((this.factorial((n)))/(this.factorial(n-r))%1<=.49999999){
            return Math.floor((this.factorial((n)))/(this.factorial(n-r)))
        }else{
            return Math.ceil((this.factorial((n)))/(this.factorial(n-r)))
        }
    }
    _PwithR(n, r){
        return Math.pow(n, r)
    }
    _CwithR(n, r){
        if((this.factorial((n+r-1)))/(this.factorial(n-1)*this.factorial(r))%1<=.49999999){
            return Math.floor((this.factorial((n+r-1)))/(this.factorial(n-1)*this.factorial(r)))
        }else{
            return Math.ceil((this.factorial((n+r-1)))/(this.factorial(n-1)*this.factorial(r)))
        }
    }
    _CwithoutR(n, r){
        if((this.factorial((n)))/(this.factorial(n-r)*this.factorial(r))%1<=.49999999){
            return Math.floor((this.factorial((n)))/((this.factorial(n-r)*this.factorial(r))))
        }else{
            return Math.ceil((this.factorial((n)))/((this.factorial(n-r)*this.factorial(r))))
        }
    }
}

console.log('# of Permutations with Repetition', 4, 3, new Utils()._PwithR(4, 3))
console.log('# of Permutations without Repetition', 4, 3, new Utils()._PwithoutR(4, 3))
console.log('# of Combinations with Repetition', 4, 3, new Utils()._CwithR(4, 3))
console.log('# of Combinations without Repetition', 4, 3, new Utils()._CwithoutR(4, 3))

console.log(new Utils().PwithR([1, 2, 3, 4], 4))

//console.log(new Utils()._PwithoutR([1, 2, 3, 4, 5], 5))
// var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// console.log(list)
// console.log('swapping indexes 0 with 1 on ', new Utils().swap(0, 1, list))
// console.log('swapping indexes 1 with 2 on ', new Utils().swap(1, 2, list))
// console.log('swapping indexes 0 with 3 on ', new Utils().swap(0, 3, list))
// console.log('swapping indexes 1 with 5 on ', new Utils().swap(1, 5, list))
// console.log('swapping indexes 0 with 9 on ', new Utils().swap(0, 9, list))
// console.log('swapping indexes 8 with 9 on ', new Utils().swap(8, 9, list))
// console.log('swapping indexes 7 with 9 on ', new Utils().swap(7, 9, list))






// var chars = []
// for(var i = 1; i<=10; i++){
//     chars.push(i)
// }
// var out = new Utils().combinationWithRepetition(chars, 2, [])
// console.log(out.length)
// console.log(new Utils()._combinationWithRepetition(10, 2))



//Permutation without repetition
//symbols =[1,2,3,4] n=4 output=24  (with repetition we have 256 combinations)
//we need to find an iterative pattern

