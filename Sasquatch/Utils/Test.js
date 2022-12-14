import {Encoding, Utils, Rand} from "./Utils.js"
import assert from "node:assert"
export class UtilsTest{

    constructor(){
        // this.bin2hex()

        // this.string2Hex()
        // this.hex2String()
        // this._buffer2String()
        // this.string2Buffer()
        // this.buffer2String()
        
        // this.buffer2Hex()
        // this.hex2Buffer()


        // this.hex2Decimal()
        // this.decimal2Hex()



        // this.range()
        // this.str()

        this.nibble2ByteBE()
        this.bytes2DecimalBE()
        this.decimal2BytesBE()
        this.format2BytesBE()


        this.nibble2ByteLE()
        this.bytes2DecimalLE()
        this.decimal2BytesLE()
        this.format2BytesLE()

        this.hexBE()
        this.hex2BytesBE()
        this.bytes2HexBE()
        this.hex2DecimalBE()
        this.decimal2HexBE()

        this.hexLE()
        this.hex2BytesLE()
        this.bytes2HexLE()
        this.hex2DecimalLE()
        this.decimal2HexLE()


    }

    str(){
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



    bytes2DecimalBE(){
        console.log('bytes2DecimalBE()')
        for(var i = 0; i<=1000; i++){
            var bytes = new Encoding().decimal2BytesBE(i)
            assert.equal(
                new Encoding().decimal2BytesBE(i), 
                new Encoding().decimal2BytesBE(new Encoding().bytes2DecimalBE(bytes))
            )
        }
    }

    decimal2BytesBE(){
        console.log('decimal2BytesBE()')
        for(var i = 0; i<=1000; i++){
            assert.equal(
                new Encoding().bytes2DecimalBE(new Encoding().decimal2BytesBE(i)), 
                i
            )
        }
    }


    decimal2BytesLE(){
        console.log('decimal2BytesLE()')
        for(var i = 0; i<=1000; i++){
            //javascript assumes parseInt is little endian
            assert.equal(
                new Encoding().bytes2DecimalLE(new Encoding().decimal2BytesLE(i)), 
                i
            )
        }
    }

    bytes2DecimalLE(){
        console.log('bytes2DecimalLE()')
        for(var i = 1; i<1000; i++){
            var bytes = new Encoding().decimal2BytesLE(i)
            assert.equal(
                i, 
                new Encoding().bytes2DecimalLE(bytes)
            )
        }
    }

    nibble2ByteBE(){
        console.log('nibble2ByteBE()')
        for(var i = 17; i<1000; i++){
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

        for(var i = 17; i<1000; i++){
            var bin = new Encoding().decimal2BytesLE(i)
            var nibble = new Encoding().nibble2ByteLE(bin.slice())            
            var nibble2=''
            for(var j =0; j<4; j++){
                nibble2+=bin[j]
            }
            assert.equal(nibble2==nibble, true)
        }
    }
    format2BytesBE(){
        console.log('format2BytesBE()')

        for(var i = 0; i<1000; i++){
            assert.equal(new Encoding().bytes2DecimalBE(new Encoding().format2BytesBE(new Encoding().decimal2BytesBE(i))), i)
        }
    }

    format2BytesLE(){
        console.log('format2BytesLE()')

        for(var i = 0; i<1000; i++){
            assert.equal(new Encoding().bytes2DecimalLE(new Encoding().format2BytesLE(new Encoding().decimal2BytesLE(i))), i)
        }
    }

    hex2BytesBE(){
        console.log('hex2BinBE()')
        for(var i = 1; i<1000; i++){
            var hex = new Encoding().hexBE(i, i)
            var bin = new Encoding().hex2BytesBE(hex)
            assert.equal(hex, new Encoding().bytes2HexBE(bin))
        }
    }

    bytes2HexBE(){
        console.log('bytes2HexBE()')
        for(var i = 1; i<1000; i++){
            var bytes = new Encoding().decimal2BytesBE(i)
            var hex = new Encoding().bytes2HexBE(bytes)
            assert.equal(bytes, new Encoding().hex2BytesBE(hex))
        }
    }

    hexBE(){
        console.log('hexBE()')
        for(var i = 0; i<1000; i++){
            var hex = new Encoding().hexBE(i, i)
            assert.equal(new Encoding().bytes2DecimalBE(new Encoding().hex2BytesBE(hex)), i)
        }
    }

    hex2DecimalBE(){
        console.log('hex2DecimalBE()')
        for(var i = 1; i<1000; i++){
            var bytes = new Encoding().decimal2BytesBE(i)
            var hex = new Encoding().bytes2HexBE(bytes)
            assert.equal(i, new Encoding().hex2DecimalBE(hex))
        }
    }

    decimal2HexBE(){
        console.log('decimal2HexBE()')
        for(var i = 1; i<1000; i++){
            var bytes = new Encoding().decimal2BytesBE(i)
            var hex = new Encoding().bytes2HexBE(bytes)
            assert.equal(hex, new Encoding().decimal2HexBE(i))
        }
    }




    hex2BytesLE(){
        console.log('hex2BytesLE()')
        for(var i = 1; i<1000; i++){
            var hex = new Encoding().hexLE(i, i)
            var bin = new Encoding().hex2BytesLE(hex)
            assert.equal(hex, new Encoding().bytes2HexLE(bin))
        }
    }

    bytes2HexLE(){
        console.log('bytes2HexLE()')
        for(var i = 1; i<1000; i++){
            var bytes = new Encoding().decimal2BytesLE(i)
            var hex = new Encoding().bytes2HexLE(bytes)
            assert.equal(bytes, new Encoding().hex2BytesLE(hex))
        }
    }

    hexLE(){
        console.log('hexLE()')
        for(var i = 0; i<1000; i++){
            var hex = new Encoding().hexLE(i, i)
            assert.equal(new Encoding().bytes2DecimalLE(new Encoding().hex2BytesLE(hex)), i)
        }
    }

    hex2DecimalLE(){
        console.log('hex2DecimalLE()')
        for(var i = 1; i<1000; i++){
            var bytes = new Encoding().decimal2BytesLE(i)
            var hex = new Encoding().bytes2HexLE(bytes)
            assert.equal(i, new Encoding().hex2DecimalLE(hex))
        }
    }

    decimal2HexLE(){
        console.log('decimal2HexLE()')
        for(var i = 1; i<1000; i++){
            var bytes = new Encoding().decimal2BytesLE(i)
            var hex = new Encoding().bytes2HexLE(bytes)
            assert.equal(hex, new Encoding().decimal2HexLE(i))
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
    //     for(var i = 0; i<10000; i++){
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
    //     for(var i = 0; i<10000; i++){
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