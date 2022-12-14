import {Encoding, Utils, Rand} from "./Utils.js"
import assert from "node:assert"
export class UtilsTest{

    constructor(){


        this.codePointMap=new Rand().codePointMapRange(0, 60000)
        this.codeMap=new Rand().codeMapRange(0, 60000)
        this.range()
        this.str()



        this.formatBytesBE()
        this.formatBytesLE()
        this.formatHexBE()
        this.formatHexLE()

        this.codeMapRange()
        this.codePointMapRange()

        this.bytesRangeBE()
        this.bytesRangeLE()
        this.bytes2DecimalBE()
        this.bytes2DecimalLE()
        this.bytes2HexBE()
        this.bytes2HexLE()

        this.nibble2ByteBE()
        this.nibble2ByteLE()

        this.decimal2BytesBE()
        this.decimal2BytesLE()
        this.decimal2HexBE()
        this.decimal2HexLE()
        //this.decimal2Char()

        this.hexRangeBE()
        this.hexRangeLE()
        this.hex2BytesBE()
        this.hex2BytesLE()
        this.hex2DecimalBE()
        this.hex2DecimalLE()
        this.hexBuffer2StringBE()
        this.hexBuffer2StringLE()

    }

    str(){
        console.log('str()')
        for(var i = 0; i<10; i++){
            var inclusive=false
            var j = 100;
            while(inclusive==false){
                j++
                var str = new Rand().str(i, j)
                assert.equal(str.length<=j, true)
                assert.equal(str.length>=i, true)
                if(str.length==j||str.length==i){
                    inclusive=true
                    break
                }
            }
            assert.equal(inclusive, true)
        }
    }

    range(){
        console.log('range()')
        for(var i = 0; i<10; i++){
            var inclusive=false
            var j = 100;
            while(inclusive==false){
                j++
                var number = new Rand().range(i, j)
                assert.equal(number<=j, true)
                assert.equal(number>=i, true)
                if(number==j||number==i){
                    inclusive=true
                    break
                }
            }
            assert.equal(inclusive, true)
        }
    }
    formatHexBE(){
        console.log('formatHexBE()')
        //send in 1 it should return length 2 hex, send in 3 and it should return length 4 etc...
        for(var  i = 0; i<10000; i++){
            if(i%2!=0){
                var hex = new Rand().hexRangeBE(i, i)
                hex = new Encoding().formatHexBE(hex)
                assert.equal(hex.length%2==0, true)
                assert.equal(new Encoding().hex2DecimalBE(hex), i)

            }
        }
    }
    formatHexLE(){
        console.log('formatHexLE()')
        //send in 1 it should return length 2 hex, send in 3 and it should return length 4 etc...
        for(var  i = 0; i<10000; i++){
            if(i%2!=0){
                var hex = new Rand().hexRangeLE(i, i)
                hex = new Encoding().formatHexLE(hex)
                assert.equal(hex.length%2==0, true)
                assert.equal(new Encoding().hex2DecimalLE(hex), i)
            }
        }
    }

    bytesRangeBE(){
        for(var i = 0; i<100000; i++){
            var inclusive=false
            var j = i+1;
            while(inclusive==false){
                j++
                var byte = new Rand().bytesRangeBE(i, j)
                assert.equal(new Encoding().bytes2DecimalBE(byte)<=j, true)
                assert.equal(new Encoding().bytes2DecimalBE(byte)>=i, true)
                if(new Encoding().bytes2DecimalBE(byte)==j||new Encoding().bytes2DecimalBE(byte)==i){
                    inclusive=true
                    break
                }
            }
            assert.equal(inclusive, true)
        }
    }

    bytesRangeLE(){
        for(var i = 0; i<100000; i++){
            var inclusive=false
            var j = i+1;
            while(inclusive==false){
                j++
                var byte = new Rand().bytesRangeLE(i, j)
                assert.equal(new Encoding().bytes2DecimalLE(byte)<=j, true)
                assert.equal(new Encoding().bytes2DecimalLE(byte)>=i, true)
                if(new Encoding().bytes2DecimalLE(byte)==j||new Encoding().bytes2DecimalLE(byte)==i){
                    inclusive=true
                    break
                }
            }
            assert.equal(inclusive, true)
        }
    }

    bytes2DecimalBE(){
        console.log('bytes2DecimalBE()')
        for(var i = 0; i<=100000; i++){
            var bytes = new Encoding().decimal2BytesBE(i)
            assert.equal(
                new Encoding().decimal2BytesBE(i), 
                new Encoding().decimal2BytesBE(new Encoding().bytes2DecimalBE(bytes))
            )
        }
    }

    decimal2BytesBE(){
        console.log('decimal2BytesBE()')
        for(var i = 0; i<=100000; i++){
            assert.equal(
                new Encoding().bytes2DecimalBE(new Encoding().decimal2BytesBE(i)), 
                i
            )
        }
    }

    decimal2BytesLE(){
        console.log('decimal2BytesLE()')
        for(var i = 0; i<=100000; i++){
            //javascript assumes parseInt is little endian
            assert.equal(
                new Encoding().bytes2DecimalLE(new Encoding().decimal2BytesLE(i)), 
                i
            )
        }
    }

    bytes2DecimalLE(){
        console.log('bytes2DecimalLE()')
        for(var i = 1; i<100000; i++){
            var bytes = new Encoding().decimal2BytesLE(i)
            assert.equal(
                i, 
                new Encoding().bytes2DecimalLE(bytes)
            )
        }
    }

    nibble2ByteBE(){
        console.log('nibble2ByteBE()')
        for(var i = 0; i<100000; i++){
            var bin = new Encoding().decimal2BytesBE(i)
            var nibble = new Encoding().nibble2ByteBE(bin.slice())            
            var nibble2=''
            for(var j = bin.length-4; j<=bin.length-1; j++){
                nibble2+=bin[j]
            }
            assert.equal(nibble2==nibble, true)
        }
    }

    nibble2ByteLE(){
        console.log('nibble2ByteLE()')

        for(var i = 0; i<100000; i++){
            var bin = new Encoding().decimal2BytesLE(i)
            var nibble = new Encoding().nibble2ByteLE(bin.slice())            
            var nibble2=''
            for(var j =0; j<4; j++){
                nibble2+=bin[j]
            }
            assert.equal(nibble2==nibble, true)
        }
    }

    formatBytesBE(){
        console.log('formatBytesBE()')

        for(var i = 0; i<100000; i++){
            assert.equal(new Encoding().bytes2DecimalBE(new Encoding().formatBytesBE(new Encoding().decimal2BytesBE(i))), i)
        }
    }

    formatBytesLE(){
        console.log('formatBytesLE()')

        for(var i = 0; i<100000; i++){
            assert.equal(new Encoding().bytes2DecimalLE(new Encoding().formatBytesLE(new Encoding().decimal2BytesLE(i))), i)
        }
    }

    hex2BytesBE(){
        console.log('hex2BinBE()')
        var j=10;
        for(var i = 0; i<1000; i++){
            j*=2
            var hex = new Rand().hexRangeBE(i, j)
            var bin = new Encoding().hex2BytesBE(hex)
            assert.equal(hex, new Encoding().bytes2HexBE(bin))
        }
    }

    bytes2HexBE(){
        console.log('bytes2HexBE()')
        for(var i = 1; i<100000; i++){
            var bytes = new Encoding().decimal2BytesBE(i)
            var hex = new Encoding().bytes2HexBE(bytes)
            assert.equal(bytes, new Encoding().hex2BytesBE(hex))
        }
    }

    hexRangeBE(){
        console.log('hexRangeBE()')
        var j=10;
        for(var i = 0; i<1000; i++){
            j*=2
            var hex = new Rand().hexRangeBE(i, i)
            assert.equal(new Encoding().bytes2DecimalBE(new Encoding().hex2BytesBE(hex)), i)
        }
    }

    hex2DecimalBE(){
        console.log('hex2DecimalBE()')
        for(var i = 1; i<100000; i++){
            var bytes = new Encoding().decimal2BytesBE(i)
            var hex = new Encoding().bytes2HexBE(bytes)
            assert.equal(i, new Encoding().hex2DecimalBE(hex))
        }
    }

    decimal2HexBE(){
        console.log('decimal2HexBE()')
        for(var i = 1; i<100000; i++){
            var bytes = new Encoding().decimal2BytesBE(i)
            var hex = new Encoding().bytes2HexBE(bytes)
            assert.equal(hex, new Encoding().decimal2HexBE(i))
        }
    }

    hex2BytesLE(){
        console.log('hex2BytesLE()')
        var j=10;
        for(var i = 1; i<100000; i++){
            j+=2
            var hex = new Rand().hexRangeLE(i, j)
            var bin = new Encoding().hex2BytesLE(hex)
            assert.equal(hex, new Encoding().bytes2HexLE(bin))
        }
    }

    bytes2HexLE(){
        console.log('bytes2HexLE()')
        for(var i = 1; i<100000; i++){
            var bytes = new Encoding().decimal2BytesLE(i)
            var hex = new Encoding().bytes2HexLE(bytes)
            assert.equal(bytes, new Encoding().hex2BytesLE(hex))
        }
    }

    hexRangeLE(){
        console.log('hexRangeLE()')
        var j=10;
        for(var i = 0; i<1000; i++){
            var hex = new Rand().hexRangeLE(i, j)
            j*=2;
            assert.equal(new Encoding().bytes2HexLE(new Encoding().hex2BytesLE(hex)), hex)
        }
    }

    hex2DecimalLE(){
        console.log('hex2DecimalLE()')
        for(var i = 1; i<100000; i++){
            var bytes = new Encoding().decimal2BytesLE(i)
            var hex = new Encoding().bytes2HexLE(bytes)
            assert.equal(i, new Encoding().hex2DecimalLE(hex))
        }
    }

    decimal2HexLE(){
        console.log('decimal2HexLE()')
        for(var i = 1; i<100000; i++){
            var bytes = new Encoding().decimal2BytesLE(i)
            var hex = new Encoding().bytes2HexLE(bytes)
            assert.equal(hex, new Encoding().decimal2HexLE(i))
        }
    }

    codeMapRange(){
        console.log('codeMapRange()')
        for(var i = 0; i<60000; i++){
            var codeMap = new Rand().codeMapRange(i, i)
            var keys = Object.keys(codeMap)
            for(var j=0; j<keys.length; j++){
                assert.equal(codeMap[keys[j]]['bin'], new Encoding().decimal2BytesBE(codeMap[keys[j]]['codePoint']))
                assert.equal(codeMap[keys[j]]['hexBE'], new Encoding().decimal2HexBE(codeMap[keys[j]]['codePoint']))
            }
        }
    }

    codePointMapRange(){
        console.log('codePointMapRange()')
        for(var i = 0; i<60000; i++){
            var codePointMap = new Rand().codePointMapRange(i, i)
            var keys = Object.keys(codePointMap)
            for(var j=0; j<keys.length; j++){
                assert.equal(codePointMap[keys[j]]['bin'], new Encoding().decimal2BytesBE(i))
                assert.equal(codePointMap[keys[j]]['hexBE'], new Encoding().decimal2HexBE(i))
            }
        }
    }

    hexBuffer2StringBE(){
        console.log('hexBuffer2StringBE')
        var buffer = []
        for(var i = 0; i<60000; i++){
           buffer.push(new Rand().hexRangeBE(i, i))
        }
        var string = new Encoding().hexBuffer2StringBE(buffer, this.codePointMap)
        for(var i = 0; i<string.length; i++){
            assert.equal(new Encoding().char2HexBE(string[i], this.codeMap), buffer[i]) 
        }
    }

    hexBuffer2StringLE(){
        console.log('hexBuffer2StringLE')
        var buffer = []
        for(var i = 0; i<60000; i++){
           buffer.push(new Rand().hexRangeLE(i, i))
        }
        var string = new Encoding().hexBuffer2StringLE(buffer, this.codePointMap)
        for(var i = 0; i<string.length; i++){
            assert.equal(new Encoding().char2HexLE(string[i], this.codeMap), buffer[i]) 
        }
    }

    // _buffer2String(){
    //     var buff = new Encoding().string2Buffer('hello world!')
    //     var string = new Encoding()._buffer2String(buff)
    //     console.log(string)
    // }

    // bin2hex(){
    //     console.log('bin2hex()')
    //     for(var i = 0; i<200; i++){
    //         var bytes = new Encoding().bytes(i)
    //         var hex = new Encoding().bin2hex(bytes)
    //         assert.equal(bytes, new Encoding().hex2bin(hex))
    //     }
    // }

    // string2Hex(){
    //     console.log('string2hex()')
    //     for(var i = 10; i<200; i++){
    //         var str = new Rand().str(i)
    //         var hex = new Encoding().string2Hex(str)
    //         console.log('a;lgkas;dglk', str, hex)
    //         assert.equal(str, new Encoding().hex2String(new Encoding().strip(hex)))
    //     }
    // }

    // hex2String(){
    //     console.log('hex2String()')
    //     for(var i = 1; i<100; i++){
    //         if(i%2==0){
    //             var hex = new Encoding().hex(i)
    //             var str = new Encoding().hex2String(hex)  
    //             console.log(hex, str)  
    //             assert.equal(hex, new Encoding().string2Hex(str))
    //         }
            
    //     }
    // }

    // string2Buffer(){
    //     console.log('string2Buffer()')
    //     for(var i = 0; i<200; i++){
    //         var str = new Rand().str(i)
    //         var buffer = new Encoding().string2Buffer(str)
    //         assert.equal(str, new Encoding().buffer2String(buffer))
    //     }
    // }
    // buffer2String(){
    //     console.log('buffer2String()')
    //     for(var i = 1; i<200; i++){
    //         if(i%2==0){
    //             var buffer = new Rand().buffer(i)
    //             var str = new Utils().buffer2String(buffer)
    //             for(var j = 0; j<buffer.length; j++){
    //                 assert.equal(buffer[j], new Utils().string2Buffer(str)[j])
    //             }
    //         }
    //     }
    // }

    // buffer2Hex(){
    //     console.log('buffer2Hex()')
    //     for(var i = 0; i<200; i++){
    //         var hex = new Rand().hex(i)
    //         var buffer = new Utils().hex2Buffer(hex)
    //         assert.equal(hex, new Utils().buffer2Hex(buffer))
    //     }
    // }

    // hex2Buffer(){
    //     console.log('hex2Buffer()')
    //     for(var i = 0; i<200; i++){
    //         var buffer = new Rand().buffer(i)
    //         var hex = new Utils().buffer2Hex(buffer)
    //         for(var j=0; j<buffer.length; j++){
    //             assert.equal(buffer[j], new Utils().hex2Buffer(hex)[j])
    //         }
    //     }
    // }



    // decimal2Bin(){
    //     console.log('decimal2Bin()')
    //     for(var i = 0; i<1000000; i++){
    //         var decimal = new Rand().int(i)
    //         var bin = new Utils().decimal2Bin(decimal)
    //         assert.equal(decimal, new Utils().bin2Decimal(bin))
    //     }
    // }  

    // hex2Decimal(){
    //     console.log('hex2Decimal()')
    //     for(var i = 5; i<20; i++){

    //         var hex = new Rand().hex(i)
    //         var decimal = new Utils().hex2Decimal(hex)
    //         // console.log(hex, decimal)
    //         assert.equal(new Utils().hex2bin(hex), new Utils().decimal2Bin(decimal))
    //     }
    // }

    // decimal2Hex(){
    //     console.log('decimal2Hex()')
    //     for(var i = 0; i<1000000; i++){
    //         var hex = new Rand().hex(i)
    //         var decimal = new Utils().hex2Decimal(hex)
    //         // console.log(hex, decimal)
    //         assert.equal(hex, new Utils().decimal2Hex(decimal))
    //     }
    // }

    // objectComparator(){

    // }



    // int(){

    // }

    // arr(){

    // }

    // thing(){

    // }

    // intArr(){

    // }

    // strArr(){

    // }

    // obj(){

    // }

    // objArr(){

    // }

    // selection(){

    // }

    // range(){

    // }

    // mod10(){

    // }

    // latin(){

    // }

    // arabic(){

    // }

    // cjk(){

    // }
} 

new UtilsTest()