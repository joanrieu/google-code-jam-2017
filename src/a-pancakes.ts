/**
 * Problem A. Oversized Pancake Flipper
 * https://code.google.com/codejam/contest/3264486/dashboard
 */
class Problem {
    caseCount: number
    cases: Case[]

    static fromInput(input: string) {
        const [
            countLine,
            ...caseLines
        ] = input.trim().split('\n');
        const problem = new Problem()
        problem.caseCount = parseInt(countLine)
        problem.cases = caseLines.map(Case.fromInput)
        return problem
    }

    toOutput() {
        return this.cases
            .map(caze =>
                caze.toOutput())
            .join('\n') +
            '\n'
    }
}

class Case {
    caseNumber: number
    pancakeRow: Pancake[]
    pancakeFlipper: Flipper
    solution?: CaseSolution

    static fromInput(input: string, inputIndex: number) {
        const [
            pancakeString,
            flipperSizeString
        ] = input.split(' ')
        const caze = new Case()
        caze.caseNumber = inputIndex + 1
        caze.pancakeRow = pancakeString.split('').map(Pancake.fromInput)
        return caze
    }

    toOutput() {
        return 'Case #' + this.caseNumber + ': ' +
            (this.solution ? this.solution.flips.length : 'IMPOSSIBLE')
    }
}

class Pancake {
    side: PancakeSide

    static fromInput(input: string) {
        const pancake = new Pancake()
        pancake.side = {
            '+': PancakeSide.Happy,
            '-': PancakeSide.Blank
        }[input]
        return pancake
    }
}

enum PancakeSide {
    Happy,
    Blank
}

class Flipper {
    size: number
}

class CaseSolution {
    flips: Flip[]
}

class Flip {
    leftPosition: number
}

import fs = require('fs')
const input = fs.readFileSync('a-example.txt', 'utf8')
console.log(Problem.fromInput(input).toOutput())
