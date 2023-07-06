const getIndex = (arrayToCheck: any[], fieldNameIndex: string, indexToFind: string | number | undefined, debug: boolean = false) =>{
    let indexCurr : number;

    let op = arrayToCheck.filter(ele => {
        if(debug)
            console.log("Debug Ele", ele);
        return ele[fieldNameIndex] === indexToFind
    });

    indexCurr = arrayToCheck.indexOf(op[0]);

    return indexCurr
}

export default getIndex;