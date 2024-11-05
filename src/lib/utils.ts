export const createStringWithSingleWhiteSpaces = (str: string) : string => {
    const arr = str.split(" ").filter((item) => item != "");
    console.log(arr, " arrrrr");
    return arr.join(" ")
}