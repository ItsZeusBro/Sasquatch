import {CoordinateClock} from "../Matrix/Coordinates.js"
import fs from "node:fs"
import path from "node:path"
import {Utils} from "../Utils/Utils.js"

export class RuleTree{
    constructor(map){
		// this.map = map
		// this.create(map)
    }
	
	create(map){
		//theta represents the code length which is mathematically related to a minimal set of codes
		//corresponding to the input and output
		//we only want to create the file if its not already created
		if(this.exists(map)){
			this.map = this.import(map)
		}else{
			//1-2 neighbors for 1 dimension; 
			//2-4 for 2 dimensions; 
			//3-6 for 3 dimensions; 
			//4-8 for 4 dimensions 
			this.map['codes']=this.map['codes'].sort()
			this.map['ruleTree']={}
			for(var neighbor_count=this.map['dimension']; neighbor_count<=2*this.map['dimension']; neighbor_count++){
				this.map['ruleTree'][neighbor_count]={}
				this.ruleTree(this.map['ruleTree'][neighbor_count], neighbor_count, this.map['codes'].slice())
			}
			this.export(this.map)
		}		
	}

	exists(map){
		var path = new Utils().resolve('Map/RuleTree/RuleTrees/')
		path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'.RuleTree'
		return fs.existsSync(path)
	}

	export(map){
		var path = new Utils().resolve('Map/RuleTree/RuleTrees/')
		path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'.RuleTree'
		fs.writeFileSync(path, JSON.stringify({'tree':map['ruleTree'], 'rules':map['rules']}))
	}

	import(map){
		var path = new Utils().resolve('Map/RuleTree/RuleTrees/')
		path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'.RuleTree'
		var obj = JSON.parse(fs.readFileSync(path))
		map['ruleTree']=obj['tree']
		map['rules']=obj['rules']
		return map
	}

	//if we have a list of symbols, which we know are alphabetically sorted, 
	//and we have a neighbor_count, then we can deterministically create trees
	//and store them for future use. We can pre-load the most commonly used ones
	//into ram and use them at random access speeds (in the future when we have more RAM)

	//if we have 3 neighbors for our tree and 5 symbols, we can optimize, because we are searching
	//the neighborhood in alphabetical order
	//1:{1:{1:r, 2:r, 3:r, 4:r, 5:r} 2:{2:r, 3:r, 4:r, 5:r}, 3:{3:r, 4:r, 5:r}, 4:{4:r, 5:r}, 5{5:r}}
	//2:{2:{2:r, 3:r, 4:r, 5:r}, 3:{3:r, 4:r, 5:r}, 4:{4:r, 5:r}, 5{5:r}}
	//3:3:{3:r, 4:r, 5:r}, 4:{4:r, 5:r}, 5{5:r}}
	//4:{4:{4:r, 5:r}, 5{5:r}}
	//5:{5{5:r}}

	ruleTree(tree, neighbor_count, symbols, payload=[], rules=[]){
		//the number of neighborhoods is symbols.length^(neighborcount+1)
		//where 1 accounts for an empty space
		symbols.sort()
		var symbolcoord1=[]
		var symbolcoord2=[]
		for(var i = 0; i<neighbor_count; i++){
			symbolcoord1.push(0)
			symbolcoord2.push(symbols.length-1)
		}

		var coordinates = new CoordinateClock(symbolcoord1, symbolcoord2).coordinates()
		this.map['rules']=[]
		for(var i = 0; i<coordinates.length; i++){
			for(var j = 0; j<coordinates[i].length; j++){
				this._ruleTree(symbols, coordinates[i].sort(), tree, payload)
			}
		}
	}

	_ruleTree(symbols, coordinates, tree, payload){
		var i = coordinates.shift()
		if(!tree[symbols[i]]){tree[symbols[i]]={}}
		if(coordinates.length>=1){
			tree = tree[symbols[i]]
			this._ruleTree(symbols, coordinates, tree, payload)
		}
		else if(coordinates.length==0){
			if(payload.length){
				tree[symbols[i]]=payload[0]
				this.map['rules'].push(tree[symbols[i]])
				payload.shift()
			}else{
				tree[symbols[i]]=symbols[Math.floor(Math.random() * symbols.length)]
				this.map['rules'].push(tree[symbols[i]])
			}
			return
		}
	}
	//this recursive strategy follows a tree schema (they are one and the same when used together)
	//therefore the order of the rules are recursively defined (THEREFORE WE SHOULD NOT CHANGE THE SCEHMA OR THE
	//RECURSIVE FUNCTION)
	//if we wish to use the data generated by this strategy
	refresh(tree, symbols, payload, rules=[]){
		for(var i = 0; i<Object.keys(tree).length; i++){
			var keys = Object.keys(tree)
			if(typeof tree[keys[i]]==='string'){
				if(payload){
					//ai rule generation
					tree[keys[i]]=payload[0]
					this.map['rules'].push(tree[keys[i]])
					payload.shift()
				}else{
					//random rule generation
					tree[keys[i]]=symbols[Math.floor(Math.random() * symbols.length)]
					this.map['rules'].push(tree[keys[i]])
				}
			}else{
				this.refresh(tree[keys[i]], symbols)
			}
		}
		return rules
	}

	//rules are a permutation with repetition, meaning the number of generated permutations
	//is the number of codes^number of rules. The number of codes depends on the number of unique
	//codes in the input and output when combined together. The number of rules is generated by
	//a rule tree which has a mathematical formula related to the neighbor range for a dimension
	//the rule-tree for any cell with n neighbors produces r rules. (we need this equation) 
	rules(){
		//Strategy: we find the rules through permutation
		//then we place them into a recursive tree (this is optimal)

		//We need neighborhood combinations (with repetition) for each charachter (which does not violate
		//alphabetical sorting)
		//each charachter in the set needs its own neighborhood combinations
		//a neighborhood is limited to a range for each dimension called Range(d)
		//which returns a range of neighborhood types



	}
	treeInsert(tree, neighborhood){
		
	}
	//these neighborhoods stay forever, so efficiency is not a huge deal
	neighborhoods(codes, n, tree={}){
		//add neighborhoods of size n for all codes 
		codes.sort()
		codes.reverse()
		for(var j = 0; j<codes.length; j++){
			var prev;
			do{
				prev = this.nextNeighborhood(codes, codes[j], prev, n)
				if(prev){this.treeInsert(tree, prev)}
			}while(prev)
			// 	//when prev returns null, we start with the next code
		}
		return tree
	}

	nextNeighborhood(codes, code, prev, n){
		//find the next neighborhood starting with code, using codes, for a neighborhood with n neighbors
		//using the prev neighborhood
		if(prev){
			//prev starts with a code that we cannot change, all the others can be changed in descending order
			//the rule is the following
			//decrement the last code by one (in prev), if its at the base code (the last code in codes)
			//decrement the second to last code by one, if that is at the base code (the last code in codes)
			//decrement the third to last... if we reach the first code, and there is nothing to decrement
			//return null
			for(var i=prev.length-1; i>=0; i--){
				if(i==0){
					//this means we changed nothing in prev
					//we need to return null
					return
				}else{
					if(prev[i]==codes[codes.length-1]){
						//we need to find the most significant code
						//so we need to reverse search for a code in prev that is not equal to codes[codes.length-1]
						//we need to decrement that code by 1, and
						for(var j=i; j>0; j--){
							if(prev[j]!=codes[codes.length-1]){
								prev[j]=codes[codes.indexOf(prev[j])+1]
								var c=prev[j]
								// then have all the antecedent codes match that significant code
								for(var k=j+1; k<prev.length; k++){
									prev[k]=c
								}
								return prev
							}
						}

					}else{
						//this is the best case scenario, we just decrement prev[i]
						//and return
						prev[i]=codes[codes.indexOf(prev[i])+1]
						return prev
					}
				}
			}

		}else{
			//send back the first in the set
			//the rule for this is a list of n length all positions having the same code
			prev=[]
			for(var i = 0; i<n; i++){
				prev.push(code)
			}
			return prev
		}
	}

	rule(neighborhood){
		//a neighborhood looks like this
		//console.log(neighborhood, neighbor_codes, neighbor_count)
		var neighbor_keys = Object.keys(neighborhood)
		var neighbor_count = neighbor_keys.length
		var neighbor_codes = []
		for(var i = 0; i<neighbor_count; i++){
			neighbor_codes.push(neighborhood[neighbor_keys[i]])
		}
		neighbor_codes.sort()
		var rule = this.map['ruleTree'][neighbor_count]
		for(var i = 0; i<neighbor_count; i++){
			rule = rule[neighbor_codes[i]]
		}
		//returns just a code
		return rule
	}

	hash(map){
		var ruleKeys = Object.keys(map['rules'])
		for(var i = 0; i<ruleKeys.length; i++){
			var rule = JSON.stringify(map['rules'][ruleKeys[i]]['neighborhood'])
			map['rules'][ruleKeys[i]]['nhHash']=createHash('sha256').update(rule).digest('hex'); 
		}
	}
}

var codes = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
var n = 3
new RuleTree().neighborhoods(codes, n)