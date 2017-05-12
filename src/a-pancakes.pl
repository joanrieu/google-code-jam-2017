:- use_module(library(clpfd)).

happy.
blank.

% Flips one pancake
flip_one(blank, happy).
flip_one(happy, blank).

% Are all the pancakes happy?
all_happy(Pancakes) :-
    maplist(=(happy), Pancakes).

% Flips all the pancakes
flip(Pancakes, FlippedPancakes) :-
    maplist(flip_one, Pancakes, FlippedPancakes).

% P2 is the list of pancakes to flip
split_for_flip(Pancakes, FlipWidth, FlipIndex, P1, P2, P3) :-
    append([P1, P2, P3], Pancakes),
    length(P1, FlipIndex),
    length(P2, FlipWidth).

% Flips a few pancakes
flip(Pancakes, FlipWidth, FlipIndex, FlippedPancakes) :-
    split_for_flip(Pancakes, FlipWidth, FlipIndex, P1, P2, P3),
    flip(P2, FP2),
    append([P1, FP2, P3], FlippedPancakes).

% Flips as many pancakes as needed to make them all happy
% Optimized to avoid performing the same flip twice
flip_until_all_happy(Pancakes, FlipWidth, FlipIndexSet, CurrentIteration, IterationCount) :-
    all_happy(Pancakes),
    IterationCount #= CurrentIteration;
    select(FlipIndex, FlipIndexSet, NextFlipIndexSet),
    flip(Pancakes, FlipWidth, FlipIndex, FlippedPancakes),
    NextIteration #= CurrentIteration + 1,
    flip_until_all_happy(FlippedPancakes, FlipWidth, NextFlipIndexSet, NextIteration, IterationCount).

% Wrapper for flip_until_all_happy/5
flip_until_all_happy(Pancakes, FlipWidth, IterationCount) :-
    length(Pancakes, PancakeCount),
    numlist(0, PancakeCount, FlipIndexSet),
    flip_until_all_happy(Pancakes, FlipWidth, FlipIndexSet, 0, IterationCount).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

write_solution(CaseId, IterationCount, OutputStream) :-
    write(OutputStream, 'CASE #'),
    write(OutputStream, CaseId),
    write(OutputStream, ': '),
    writeln(OutputStream, IterationCount),
    flush_output(OutputStream).

write_impossible(CaseId, OutputStream) :-
    write(OutputStream, 'CASE #'),
    write(OutputStream, CaseId),
    writeln(OutputStream, ': IMPOSSIBLE'),
    flush_output(OutputStream).

solve_case(CaseId, Pancakes, FlipWidth, OutputStream) :-
    ignore(flip_until_all_happy(Pancakes, FlipWidth, IterationCount) ->
            write_solution(CaseId, IterationCount, OutputStream);
            write_impossible(CaseId, OutputStream)).

pancake_char(happy, '+').
pancake_char(blank, '-').

split_case_string(CaseString, Pancakes, FlipWidth) :-
    split_string(CaseString, ' ', ' ', [PancakesString, FlipWidthString]),
    string_chars(PancakesString, PancakeChars),
    maplist(pancake_char, Pancakes, PancakeChars),
    number_string(FlipWidth, FlipWidthString).

split_problem_string(ProblemString, CaseStrings) :-
    split_string(ProblemString, '\n', '\n', [_ | CaseStrings]).

solve_problem_string(ProblemString, OutputStream) :-
    split_problem_string(ProblemString, CaseStrings),
    maplist(split_case_string, CaseStrings, AllPancakes, AllFlipWidths),
    length(CaseStrings, CaseCount),
    numlist(1, CaseCount, AllCaseIds),
    length(AllOutputStreams, CaseCount),
    maplist(=(OutputStream), AllOutputStreams),
    maplist(solve_case, AllCaseIds, AllPancakes, AllFlipWidths, AllOutputStreams).

solve_example() :-
    open('a-example.txt', read, InputStream),
    read_string(InputStream, _, ProblemString),
    close(InputStream),
    open('a-example.out.txt', write, OutputStream),
    solve_problem_string(ProblemString, OutputStream),
    close(OutputStream).

main() :-
    solve_example,
    halt.
