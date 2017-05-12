import {
    isTidy,
    run,
    safeTidy,
    tidy,
    slowTidy
} from "../src/b-tidy-numbers";

describe('isTidy', function () {
    it('should work on tidy numbers', function () {
        expect(isTidy(123)).toBeTruthy()
        expect(isTidy(555)).toBeTruthy()
    })
    it('should work on non-tidy numbers', function () {
        expect(isTidy(121)).toBeFalsy()
        expect(isTidy(990)).toBeFalsy()
    })
})

describe('slowTidy', function () {
    it('should work on the examples', function () {
        expect(slowTidy(132)).toBe(129)
        expect(slowTidy(1000)).toBe(999)
        expect(slowTidy(7)).toBe(7)
        //expect(slowTidy(111111111111111110)).toBe(99999999999999999)    
    })
})

describe('TidyNumber', function () {
    it('should work on single digits', function () {
        expect(tidy(0)).toBe(0)
        expect(tidy(1)).toBe(1)
        expect(tidy(2)).toBe(2)
        expect(tidy(3)).toBe(3)
        expect(tidy(4)).toBe(4)
        expect(tidy(5)).toBe(5)
        expect(tidy(6)).toBe(6)
        expect(tidy(7)).toBe(7)
        expect(tidy(8)).toBe(8)
        expect(tidy(9)).toBe(9)
    })
    it('should work on 1X numbers', function () {
        expect(tidy(10)).toBe(9)
        expect(tidy(11)).toBe(11)
        expect(tidy(12)).toBe(12)
        expect(tidy(13)).toBe(13)
        expect(tidy(14)).toBe(14)
        expect(tidy(15)).toBe(15)
        expect(tidy(16)).toBe(16)
        expect(tidy(17)).toBe(17)
        expect(tidy(18)).toBe(18)
        expect(tidy(19)).toBe(19)
    })
    it('should work on 2X numbers', function () {
        expect(tidy(20)).toBe(19)
        expect(tidy(21)).toBe(19)
        expect(tidy(22)).toBe(22)
        expect(tidy(23)).toBe(23)
        expect(tidy(24)).toBe(24)
        expect(tidy(25)).toBe(25)
        expect(tidy(26)).toBe(26)
        expect(tidy(27)).toBe(27)
        expect(tidy(28)).toBe(28)
        expect(tidy(29)).toBe(29)
    })
    it('should work on 7X numbers', function () {
        expect(tidy(70)).toBe(69)
        expect(tidy(71)).toBe(69)
        expect(tidy(72)).toBe(69)
        expect(tidy(73)).toBe(69)
        expect(tidy(74)).toBe(69)
        expect(tidy(75)).toBe(69)
        expect(tidy(76)).toBe(69)
        expect(tidy(77)).toBe(77)
        expect(tidy(78)).toBe(78)
        expect(tidy(79)).toBe(79)
    })
    it('should work on 9X numbers', function () {
        expect(tidy(90)).toBe(89)
        expect(tidy(91)).toBe(89)
        expect(tidy(92)).toBe(89)
        expect(tidy(93)).toBe(89)
        expect(tidy(94)).toBe(89)
        expect(tidy(95)).toBe(89)
        expect(tidy(96)).toBe(89)
        expect(tidy(97)).toBe(89)
        expect(tidy(98)).toBe(89)
        expect(tidy(99)).toBe(99)
    })
    it('should work on 10X numbers', function () {
        expect(tidy(100)).toBe(99)
        expect(tidy(101)).toBe(99)
        expect(tidy(102)).toBe(99)
        expect(tidy(103)).toBe(99)
        expect(tidy(104)).toBe(99)
        expect(tidy(105)).toBe(99)
        expect(tidy(106)).toBe(99)
        expect(tidy(107)).toBe(99)
        expect(tidy(108)).toBe(99)
        expect(tidy(109)).toBe(99)
    })
    it('should work on 11X numbers', function () {
        expect(tidy(110)).toBe(99)
        expect(tidy(111)).toBe(111)
        expect(tidy(112)).toBe(112)
        expect(tidy(113)).toBe(113)
        expect(tidy(114)).toBe(114)
        expect(tidy(115)).toBe(115)
        expect(tidy(116)).toBe(116)
        expect(tidy(117)).toBe(117)
        expect(tidy(118)).toBe(118)
        expect(tidy(119)).toBe(119)
    })
    it('should work on 12X numbers', function () {
        expect(tidy(120)).toBe(119)
        expect(tidy(121)).toBe(119)
        expect(tidy(122)).toBe(122)
        expect(tidy(123)).toBe(123)
        expect(tidy(124)).toBe(124)
        expect(tidy(125)).toBe(125)
        expect(tidy(126)).toBe(126)
        expect(tidy(127)).toBe(127)
        expect(tidy(128)).toBe(128)
        expect(tidy(129)).toBe(129)
    })
    it('should work on 20X numbers', function () {
        expect(tidy(200)).toBe(199)
        expect(tidy(201)).toBe(199)
        expect(tidy(202)).toBe(199)
        expect(tidy(203)).toBe(199)
        expect(tidy(204)).toBe(199)
        expect(tidy(205)).toBe(199)
        expect(tidy(206)).toBe(199)
        expect(tidy(207)).toBe(199)
        expect(tidy(208)).toBe(199)
        expect(tidy(209)).toBe(199)
    })
    it('should work on the examples', function () {
        expect(tidy(132)).toBe(129)
        expect(tidy(1000)).toBe(999)
        expect(tidy(7)).toBe(7)
        expect(tidy(111111111111111110)).toBe(99999999999999999)
    })
    it('should work on random values < 1M', function () {
        const values = []
        for (let i = 0; i < 20; ++i)
            values.push(Number(Math.random().toString().slice(2, 8)))
        values.forEach(n => expect(tidy(n)).toBe(slowTidy(n)))
    })
    it('should work on numbers with 20 digits', function () {
        const a = '16384759305939994834'
        expect(Number(a).toString()).not.toBe(a)
        const b = '15999999999999999999'
        expect(Number(b).toString()).not.toBe(b)

        const c = safeTidy(a)

        expect(c).toBe(b)
    })
    it('should work on 10k numbers in 5 seconds', function () {
        const count = 10e4
        const numbers = []
        for (let i = 0; i < count; ++i) {
            let digits = ""
            for (let j = 0; j < 20; ++j)
                digits += Math.random() * 10 | 0
            numbers.push(digits)
        }
        const before = Date.now()
        numbers.forEach(safeTidy)
        const after = Date.now()
        const delta = after - before
        expect(delta).toBeLessThan(5000)
    })
    it('should trim leading zeroes', function () {
        expect(safeTidy('10')).toBe('9')
    })
})

describe('Code Jam', function () {
    run('b-example');
})
