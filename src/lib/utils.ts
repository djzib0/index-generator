export const createStringWithSingleWhiteSpaces = (str: string) : string => {
    const arr = str.split(" ").filter((item) => item != "");
    return arr.join(" ")
}

export const convertDotToComa = (str: number) => {
    return str.toString().replace(".", ",");
}