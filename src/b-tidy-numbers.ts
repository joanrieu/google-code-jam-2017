import fs = require("fs")

export function isTidy(n: number) {
    return n.toString().split('').sort().join('') === n.toString()
}

export function slowTidy(n: number) {
    while (!isTidy(n))
        --n
    return n
}

export function tidy(n: number): number {
    return Number(safeTidy(String(n)))
}

export function safeTidy(n: string): string {
    const digits = n.split('').map(x => Number(x))
    for (let i = digits.length - 1; i > 0; --i) {
        if (digits[i - 1] > digits[i]) {
            --digits[i - 1]
            for (let j = i; j < digits.length; ++j)
                digits[j] = 9
        }
    }
    if (digits[0] === 0)
        digits.shift()
    return digits.join('')
}

export function run(inputFileName: string) {
    fs.writeFileSync(inputFileName + '.out.txt',
        fs.readFileSync(inputFileName + '.txt', 'utf8')
            .trim()
            .split('\n')
            .slice(1)
            .map(safeTidy)
            .map((output, i) =>
                'Case #' + (i + 1) + ': ' + output + '\n')
            .join('')
    )
}
