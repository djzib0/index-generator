export const createStringWithSingleWhiteSpaces = (str: string) : string => {
    const arr = str.split(" ").filter((item) => item != "");
    return arr.join(" ")
}

export const convertDotToComa = (num: number): string => {
    return num.toString().replace(".", ",");
}

export const removeZeroCharFromNum = (num: number): number => {
    const newNumber = Number(num);
    return newNumber
}