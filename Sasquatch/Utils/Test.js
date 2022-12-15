import {Encoding, Utils, Rand} from "./Utils.js"
import assert from "node:assert"
export class EncodingTest{

    constructor(verbose){
        //WARNING, DOES NOT WORK FOR BIG NUMBERS BECAUSE SCIENTIFIC NOTATION KICKS IN AND JAVASCRIPT
        //DOES NOT REPRESENT ALL OF ITS PRECISION
        this.verbose=verbose
        // this.formatBytesBE()
        // this.formatBytesLE()
        // this.formatHexBE()
        // this.formatHexLE()
        // this.decimal2Char()
        // this.decimal2BytesBE()
        // this.decimal2BytesLE()
        // this.decimal2HexBE()
        // this.decimal2HexLE()
        // this.bytes2DecimalBE()
        // this.bytes2DecimalLE()
        // this.bytes2HexBE()
        // this.bytes2HexLE()
        // this.hex2BytesBE()
        // this.hex2BytesLE()
        // this.hexRangeBE()
        // this.hexRangeLE()

        // this.byteBuffer2StringBE()
        // this.byteBuffer2StringLE()

        // this.bytes2StringBE()
        // this.bytes2StringLE()
        // this.string2BytesBufferBE()
        // this.string2BytesBufferLE()

        // this.hex2DecimalBE()
        // this.hex2DecimalLE()


        // this.hexBuffer2StringBE()
        // this.hexBuffer2StringLE()
        // this.hex2StringBE()
        // this.hex2StringLE()
        // this.string2HexBufferBE()
        // this.string2HexBufferLE()

        // this.chainTestBE()
        // this.chainTestLE()

    }



    formatBytesBE(){
        console.log('formatBytesBE()')
        var e = new Encoding()
        for(var i = 0; i<100000; i++){
            if(this.verbose){
                console.log('formatBytesBE()1', e.formatBytesBE(e.decimal2BytesBE(i)), i)
            }
            assert.equal(e.bytes2DecimalBE(e.formatBytesBE(e.decimal2BytesBE(i))), i)
        }
        for(var i = Number.MAX_SAFE_INTEGER-100000; i<=Number.MAX_SAFE_INTEGER; i++){
            if(this.verbose){
                console.log('formatBytesBE()2', e.formatBytesBE(e.decimal2BytesBE(i)), i)
            }
            assert.equal(e.bytes2DecimalBE(e.formatBytesBE(e.decimal2BytesBE(i))), i)
        }

    }

    formatBytesLE(){
        console.log('formatBytesLE()')
        var e = new Encoding()
        for(var i = 0; i<100000; i++){
            if(this.verbose){
                console.log('formatBytesLE()1',e.formatBytesLE(e.decimal2BytesLE(i)), i)
            }
            assert.equal(e.bytes2DecimalLE(e.formatBytesLE(e.decimal2BytesLE(i))), i)
        }
        for(var i = Number.MAX_SAFE_INTEGER-100000; i<=Number.MAX_SAFE_INTEGER; i++){
            if(this.verbose){
                console.log('formatBytesLE()2', e.formatBytesLE(e.decimal2BytesLE(i)), i)
            }
            assert.equal(e.bytes2DecimalLE(e.formatBytesLE(e.decimal2BytesLE(i))), i)
        }
    }

    formatHexBE(){
        console.log('formatHexBE()')
        var e = new Encoding()
        var r = new Rand()

        for(var i = 0; i<=1000000; i++){
            var hex = r.hexRangeBE(i, i)
            hex = e.formatHexBE(hex)
            assert.equal(hex.length%2==0, true)
            if(this.verbose){
                console.log('formatHexBE()1', hex, e.hex2DecimalBE(hex))
            }
            assert.equal(e.hex2DecimalBE(hex), i)
        }
        //send in 1 it should return length 2 hex, send in 3 and it should return length 4 etc...
        for(var i = Number.MAX_SAFE_INTEGER-100000; i<=Number.MAX_SAFE_INTEGER; i++){
            var hex = r.hexRangeBE(i, i)
            hex = e.formatHexBE(hex)
            assert.equal(hex.length%2==0, true)
            if(this.verbose){
                console.log('formatHexBE()1', hex, e.hex2DecimalBE(hex))
            }
            assert.equal(e.hex2DecimalBE(hex), i)
        }
    }

    formatHexLE(){
        console.log('formatHexLE()')
        var e = new Encoding()
        var r = new Rand()

        for(var i = 0; i<=1000000; i++){
            var hex = r.hexRangeLE(i, i)
            hex = e.formatHexLE(hex)
            assert.equal(hex.length%2==0, true)
            if(this.verbose){
                console.log('formatHexLE()1', hex, e.hex2DecimalLE(hex))
            }
            assert.equal(e.hex2DecimalLE(hex), i)
        }
        //send in 1 it should return length 2 hex, send in 3 and it should return length 4 etc...
        for(var i = Number.MAX_SAFE_INTEGER-100000; i<=Number.MAX_SAFE_INTEGER; i++){
            var hex = r.hexRangeLE(i, i)
            hex = e.formatHexLE(hex)
            assert.equal(hex.length%2==0, true)
            if(this.verbose){
                console.log('formatHexLE()1', hex, e.hex2DecimalLE(hex))
            }
            assert.equal(e.hex2DecimalLE(hex), i)
        }
    }

    decimal2Char(){
        console.log('decimal2Char()')
        var e  = new Encoding()
        for(var i = 0; i<=65535; i++){
            if(this.verbose){
                console.log('decimal2Char()1', i, e.decimal2Char(i))
            }
            assert.equal(String.fromCharCode(i), e.decimal2Char(i))
        }
    }

    decimal2BytesBE(){
        console.log('decimal2BytesBE()')
        var e  = new Encoding()
        for(var i = 0; i<=1000000; i++){
            if(this.verbose){
                console.log('decimal2BytesBE()1', e.decimal2BytesBE(i), i)
            }
            assert.equal(
                e.bytes2DecimalBE(e.decimal2BytesBE(i)), 
                i
            )
        }
        for(var i = Number.MAX_SAFE_INTEGER-100000; i<=Number.MAX_SAFE_INTEGER; i++){
            if(this.verbose){
                console.log('decimal2BytesBE()1', e.decimal2BytesBE(i), i)
            }
            assert.equal(
                e.bytes2DecimalBE(e.decimal2BytesBE(i)), 
                i
            )
        }
    }


    decimal2BytesLE(){
        console.log('decimal2BytesLE()')
        var e  = new Encoding()
        for(var i = 0; i<=1000000; i++){
            //javascript assumes parseInt is little endian
            if(this.verbose){
                console.log('decimal2BytesLE()1', e.decimal2BytesLE(i), i)
            }
            assert.equal(
                e.bytes2DecimalLE(e.decimal2BytesLE(i)), 
                i
            )
        }
        for(var i = Number.MAX_SAFE_INTEGER-100000; i<=Number.MAX_SAFE_INTEGER; i++){
            //javascript assumes parseInt is little endian
            if(this.verbose){
                console.log('decimal2BytesLE()1', e.decimal2BytesLE(i), i)
            }
            assert.equal(
                e.bytes2DecimalLE(e.decimal2BytesLE(i)), 
                i
            )
        }
    }

    decimal2HexBE(){
        console.log('decimal2HexBE()')
        var e  = new Encoding()
        for(var i = 0; i<=1000000; i++){
            if(this.verbose){
                console.log('decimal2HexBE()1', hex, i)
            }
            var bytes = e.decimal2BytesBE(i)
            var hex = e.bytes2HexBE(bytes)
            assert.equal(hex, e.decimal2HexBE(i))
        }
        for(var i = Number.MAX_SAFE_INTEGER-100000; i<=Number.MAX_SAFE_INTEGER; i++){
            if(this.verbose){
                console.log('decimal2HexBE()1', hex, i)
            }
            var bytes = e.decimal2BytesBE(i)
            var hex = e.bytes2HexBE(bytes)
            assert.equal(hex, e.decimal2HexBE(i))
        }
    }

    decimal2HexLE(){
        console.log('decimal2HexLE()')
        var e  = new Encoding()
        for(var i = 0; i<=1000000; i++){
            if(this.verbose){
                console.log('decimal2HexLE()1', hex, i)
            }
            var bytes = e.decimal2BytesLE(i)
            var hex = e.bytes2HexLE(bytes)
            assert.equal(hex, e.decimal2HexLE(i))
        }
        for(var i = Number.MAX_SAFE_INTEGER-100000; i<=Number.MAX_SAFE_INTEGER; i++){
            if(this.verbose){
                console.log('decimal2HexLE()1', hex, i)
            }
            var bytes = e.decimal2BytesLE(i)
            var hex = e.bytes2HexLE(bytes)
            assert.equal(hex, e.decimal2HexLE(i))
        }
    }


    bytes2DecimalBE(){

        console.log('bytes2DecimalBE()')
        var e=new Encoding()
        var bytes=''
        for(var i = 0; i<5; i++){
            bytes+=new Rand().byteRangeBE(i, i)
        }
        var decimal = e.bytes2DecimalBE(bytes)
        var bytes = e.decimal2BytesBE(decimal)
        if(this.verbose){
            console.log('bytes2DecimalBE()1', bytes, e.bytes2DecimalBE(bytes))
        }
        assert.equal(
            decimal, 
            e.bytes2DecimalBE(bytes)
        )
        for(var i = 0; i<=1000000; i++){
            var bytes = new Encoding().decimal2BytesBE(i)
            if(this.verbose){
                console.log('bytes2DecimalBE()2', bytes, e.bytes2DecimalBE(bytes))
            }
            assert.equal(
                new Encoding().decimal2BytesBE(i), 
                new Encoding().decimal2BytesBE(new Encoding().bytes2DecimalBE(bytes))
            )
        }
        for(var i = Number.MAX_SAFE_INTEGER-100000; i<=Number.MAX_SAFE_INTEGER; i++){
            var bytes = new Encoding().decimal2BytesBE(i)
            if(this.verbose){
                console.log('bytes2DecimalBE()2', bytes, e.bytes2DecimalBE(bytes))
            }
            assert.equal(
                new Encoding().decimal2BytesBE(i), 
                new Encoding().decimal2BytesBE(new Encoding().bytes2DecimalBE(bytes))
            )
        }
    }

    bytes2DecimalLE(){

        console.log('bytes2DecimalLE()')
        var e=new Encoding()
        var bytes=''
        for(var i = 0; i<5; i++){
            bytes+=new Rand().byteRangeLE(i, i)
        }
        var decimal = e.bytes2DecimalLE(bytes)
        var bytes = e.decimal2BytesLE(decimal)
        if(this.verbose){
            console.log('bytes2DecimalLE()1', bytes, e.bytes2DecimalLE(bytes))
        }
        assert.equal(
            decimal, 
            e.bytes2DecimalLE(bytes)
        )
        for(var i = 0; i<=100000; i++){
            var bytes = new Encoding().decimal2BytesLE(i)
            if(this.verbose){
                console.log('bytes2DecimalLE()2', bytes, e.bytes2DecimalLE(bytes))
            }
            assert.equal(
                new Encoding().decimal2BytesLE(i), 
                new Encoding().decimal2BytesLE(new Encoding().bytes2DecimalLE(bytes))
            )
        }
        for(var i = Number.MAX_SAFE_INTEGER-100000; i<=Number.MAX_SAFE_INTEGER; i++){
            var bytes = new Encoding().decimal2BytesLE(i)
            if(this.verbose){
                console.log('bytes2DecimalLE()2', bytes, e.bytes2DecimalLE(bytes))
            }
            assert.equal(
                new Encoding().decimal2BytesLE(i), 
                new Encoding().decimal2BytesLE(new Encoding().bytes2DecimalLE(bytes))
            )
        }
    }

    bytes2HexBE(){
        console.log('bytes2HexBE()')
        for(var i = 0; i<=100000; i++){
            var bytes = new Encoding().decimal2BytesBE(i)
            var hex = new Encoding().bytes2HexBE(bytes)
            if(this.verbose){
                console.log('bytes2HexBE()2', bytes, hex)
            }
            assert.equal(bytes, new Encoding().hex2BytesBE(hex))
        }
        for(var i = Number.MAX_SAFE_INTEGER-100000; i<=Number.MAX_SAFE_INTEGER; i++){
            var bytes = new Encoding().decimal2BytesBE(i)
            var hex = new Encoding().bytes2HexBE(bytes)
            if(this.verbose){
                console.log('bytes2HexBE()2', bytes, hex)
            }
            assert.equal(bytes, new Encoding().hex2BytesBE(hex))
        }
    }

    bytes2HexLE(){
        console.log('bytes2HexLE()')
        for(var i = 0; i<=100000; i++){
            var bytes = new Encoding().decimal2BytesLE(i)
            var hex = new Encoding().bytes2HexLE(bytes)
            if(this.verbose){
                console.log('bytes2HexLE()2', bytes, hex)
            }
            assert.equal(bytes, new Encoding().hex2BytesLE(hex))
        }
        for(var i = Number.MAX_SAFE_INTEGER-100000; i<=Number.MAX_SAFE_INTEGER; i++){
            var bytes = new Encoding().decimal2BytesLE(i)
            var hex = new Encoding().bytes2HexLE(bytes)
            if(this.verbose){
                console.log('bytes2HexLE()2', bytes, hex)
            }
            assert.equal(bytes, new Encoding().hex2BytesLE(hex))
        }
    }

    hex2BytesBE(){
        console.log('hex2BinBE()')
        for(var i = 0; i<=100000; i++){
            var hex = new Rand().hexRangeBE(i, i)
            var bin = new Encoding().hex2BytesBE(hex)
            if(this.verbose){ console.log('hex2BytesBE()2', bin, hex) }
            assert.equal(hex, new Encoding().bytes2HexBE(bin))
        }
        for(var i = Number.MAX_SAFE_INTEGER-100000; i<=Number.MAX_SAFE_INTEGER; i++){
            var hex = new Rand().hexRangeBE(i, i)
            var bin = new Encoding().hex2BytesBE(hex)
            if(this.verbose){ console.log('hex2BytesBE()2', bin, hex) }
            assert.equal(hex, new Encoding().bytes2HexBE(bin))
        }
    }

    hex2BytesLE(){
        console.log('hex2BytesLE()')
        for(var i = 0; i<=100000; i++){
            var hex = new Rand().hexRangeLE(i, i)
            var bin = new Encoding().hex2BytesLE(hex)
            if(this.verbose){ console.log('hex2BytesLE()2', bin, hex) }
            assert.equal(hex, new Encoding().bytes2HexLE(bin))
        }
        for(var i = Number.MAX_SAFE_INTEGER-100000; i<=Number.MAX_SAFE_INTEGER; i++){
            var hex = new Rand().hexRangeLE(i, i)
            var bin = new Encoding().hex2BytesLE(hex)
            if(this.verbose){ console.log('hex2BytesLE()2', bin, hex) }
            assert.equal(hex, new Encoding().bytes2HexLE(bin))
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

    hexRangeLE(){
        console.log('hexRangeLE()')
        var j=10;
        for(var i = 0; i<1000; i++){
            var hex = new Rand().hexRangeLE(i, j)
            j*=2;
            assert.equal(new Encoding().bytes2HexLE(new Encoding().hex2BytesLE(hex)), hex)
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


    byteBuffer2StringBE(){
        console.log('byteBuffer2StringBE()')
        for(var i = 0; i<=60000; i++){
            var buffer = []
            buffer.push(new Rand().byteRangeBE(i, i))
            var string = new Encoding().byteBuffer2StringBE(buffer)
            for(var j = 0; j<string.length; j++){
                assert.equal(new Encoding().hex2BytesBE(new Encoding().char2HexBE(string[j])), buffer[j]) 
            }
        }
    }

    byteBuffer2StringLE(){
        console.log('byteBuffer2StringLE()')
        for(var i = 0; i<=60000; i++){
            var buffer = []
            buffer.push(new Rand().byteRangeLE(i, i))
            var string = new Encoding().byteBuffer2StringLE(buffer)
            for(var j = 0; j<string.length; j++){
                assert.equal(new Encoding().hex2BytesLE(new Encoding().char2HexLE(string[j])), buffer[j]) 
            }
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
        console.log('hexBuffer2StringBE()')
        var buffer = []
        for(var i = 0; i<=60000; i++){
           buffer.push(new Rand().hexRangeBE(i, i))
        }
        var string = new Encoding().hexBuffer2StringBE(buffer)
        for(var i = 0; i<string.length; i++){
            assert.equal(new Encoding().char2HexBE(string[i]), buffer[i]) 
        }
    }

    hexBuffer2StringLE(){
        console.log('hexBuffer2StringLE()')
        var buffer = []
        for(var i = 0; i<=60000; i++){
           buffer.push(new Rand().hexRangeLE(i, i))
        }
        var string = new Encoding().hexBuffer2StringLE(buffer, this.codePointMap)
        for(var i = 0; i<string.length; i++){
            assert.equal(new Encoding().char2HexLE(string[i], this.codeMap), buffer[i]) 
        }
    }

    string2HexBufferBE(){
        console.log('string2HexBufferBE()')
        var j = 1;
        for(var i=0; i<10; i++){
            var str = new Rand().str(i, j)
            j*=2

            var buffer = new Encoding().string2HexBufferBE(str)
            assert.equal(str, new Encoding().hexBuffer2StringBE(buffer))
            j*=2
        }
	}

    string2HexBufferLE(){
        console.log('string2HexBufferLE()')
        var j = 1;
        for(var i=0; i<10; i++){
            var str = new Rand().str(i, j)

            j*=2
            var buffer = new Encoding().string2HexBufferLE(str)
            assert.equal(str, new Encoding().hexBuffer2StringLE(buffer))
            j*=2
        }
	}
    string2BytesBufferBE(){
        console.log('string2BytesBufferBE()')

        var j = 1;
        for(var i=0; i<10; i++){
            var str = new Rand().str(i, j)
            assert.equal(str, new Encoding().byteBuffer2StringBE(new Encoding().string2BytesBufferBE(str)))
            j*=2
        }
	}

    string2BytesBufferLE(){
        console.log('string2BytesBufferLE()')

        var j = 1;
        for(var i=0; i<10; i++){
            var str = new Rand().str(i, j)
            assert.equal(str, new Encoding().byteBuffer2StringLE(new Encoding().string2BytesBufferLE(str)))
            j*=2
        }
	}



    hex2StringBE(){
        console.log('hex2StringBE()')
        for(var j = 0; j<1000; j++){
            var hexStr=''
            for(var i = 0; i<1000; i++){
                hexStr+=''+new Rand().hexRangeBE(i, i)
            }
            var string = new Encoding().hex2StringBE(hexStr)
            assert.equal(hexStr, new Encoding().string2HexBE(string))
        }
    }
    hex2StringLE(){
        console.log('hex2StringLE()')
        for(var j = 0; j<1000; j++){
            var hexStr=''
            for(var i = 0; i<1000; i++){
                hexStr+=''+new Rand().hexRangeLE(i, i)
            }
            var string = new Encoding().hex2StringLE(hexStr)
            assert.equal(hexStr, new Encoding().string2HexLE(string))
        }
    }
    bytes2StringBE(){
        console.log('bytes2StringBE()')
        for(var j = 0; j<100; j++){
            var byteStr=''
            var str=''
            for(var i = 0; i<100; i++){
                var byte=new Rand().byteRangeBE(i, i)
                byteStr+=byte
                str+=new Encoding().byteBuffer2StringBE([byte])
            }
            var string = new Encoding().bytes2StringBE(byteStr)
            //console.log(string)
            assert.equal(str, string)
        }
    }

    bytes2StringLE(){
        console.log('bytes2StringLE()')
        for(var j = 0; j<100; j++){
            var byteStr=''
            var str=''
            for(var i = 0; i<100; i++){
                var byte=new Rand().byteRangeLE(i, i)
                byteStr+=byte
                str+=new Encoding().byteBuffer2StringLE([byte])
            }
            var string = new Encoding().bytes2StringLE(byteStr)
            assert.equal(str, string)
        }
    }

    chainTestBE(){
        console.log('chainTestBE()')
        var e=new Encoding()
        var bytes=''
        for(var i = 0; i<5; i++){
            bytes+=new Rand().byteRangeBE(i, i)
        }
        assert.equal(
            e.formatBytesBE(
                e.string2BytesBE(
                    e.hexBuffer2StringBE(
                        e.string2HexBufferBE(
                            e.byteBuffer2StringBE(
                                e.string2BytesBufferBE(
                                    e.bytes2StringBE(
                                        e.string2BytesBE(
                                            e.hex2StringBE(
                                                e.bytes2HexBE(
                                                    e.hex2BytesBE(
                                                        e.decimal2HexBE(
                                                            e.bytes2DecimalBE(
                                                                bytes
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
            , 
            e.formatBytesBE(bytes)
        )

    }
    chainTestLE(){
        console.log('chainTestLE()')
        var e=new Encoding()
        var bytes=''
        for(var i = 0; i<5; i++){
            bytes+=new Rand().byteRangeBE(i, i)
        }
        assert.equal(
            e.formatBytesLE(
                e.string2BytesLE(
                    e.hexBuffer2StringLE(
                        e.string2HexBufferLE(
                            e.byteBuffer2StringLE(
                                e.string2BytesBufferLE(
                                    e.bytes2StringLE(
                                        e.string2BytesLE(
                                            e.hex2StringLE(
                                                e.bytes2HexLE(
                                                    e.hex2BytesLE(
                                                        e.decimal2HexLE(
                                                            e.bytes2DecimalLE(
                                                                bytes
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
            , 
            e.formatBytesLE(bytes)
        )

    }
} 

class RandTest{
    constructor(){
        this.tests()
    }

    tests(){
        this.codeMapRange()
        this.codePointMapRange()
        this.str()
        this.range()
        this.bytesRangeBE()
        this.bytesRangeLE()
        this.hexRangeBE()
        this.hexRangeLE()
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

    // objectComparator(){

    // }
    thing(){

    }

    arr(){

    }

    strArr(){

    }

    intArr(){

    }

    objArr(){

    }






    // obj(){

    // }



    // selection(){

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

new EncodingTest(true)