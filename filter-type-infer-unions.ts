type TestTypeWithProps = {
    __type: string
    a: string
    b: string
    c: boolean
}

type TestTypeWitOneProp = {
    __type: string
    prop: string
}

type UnionType = TestTypeWithProps | TestTypeWitOneProp

const arrObj: UnionType[] = [
    {
        __type: "withProps",
        a: "test a",
        b: "test b",
        c: false
    },
    {
        __type: "withProps",
        a: "test c",
        b: "test d",
        c: true
    },
    {
        __type: "oneProp",
        prop: "Hi"
    }
]

arrObj.filter(el => (
    // This is a syntax error
    // Property 'a' does not exist on type 'UnionType'.
    // Property 'a' does not exist on type 'TestTypeWitOneProp'
    // Property 'b' does not exist on type 'UnionType'.
    // Property 'b' does not exist on type 'TestTypeWitOneProp'
    
    el.a !== undefined && el.b !== undefined
))

// this returns only TestTypeWithProps
const typeSafeFilter = (el: UnionType): TestTypeWithProps | null => (
    el.__type === 'withProps' ? el as TestTypeWithProps : null
)

// can't filter only the single type for the map function
arrObj.filter(typeSafeFilter)
    .map(el => 
        // This is a SyntaxError
        // Property 'a' does not exist on type 'UnionType'.
        // Property 'a' does not exist on type 'TestTypeWitOneProp'.ts(2339)
        
        el.a = "new value"
    )

// Returns Type UnionType[]
arrObj.filter(el => {
    if ('a' in el || 'b' in el) {
        return el.a !== undefined && el.b !== undefined
    }
    return el.prop !== undefined;
}).map(el =>{
    // this is a SyntaxError
    // Property 'a' does not exist on type 'UnionType'.
    return el.a = 'test'
})

// Typecasting is the only thing I can think of to solve this
const newArr = arrObj.filter(typeSafeFilter) as TestTypeWithProps[]
newArr.map(el => 
    // This is a SyntaxError
    el.a = 'test'
)
