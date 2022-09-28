export enum QuestionType {
	Boolean = 'boolean',
	MultipleChoice = 'multiplechoice',
	TextAnswer = 'textanswer',
}

abstract class Question {
	type!: QuestionType;
	description!: string;
	abstract print(): void;
}

function printQuestions(questions: Question[]) {
	for (const question of questions) {
		question.print();
	}
}

class BooleanQuestion implements Question {
	type = QuestionType.Boolean;
	description: string;

	constructor(description: string) {
		this.description = description;
	}

	print(): void {
		console.log(this.description);
		console.log(`1. True`);
		console.log(`2. False`);
	}
}

class MultipleChoiceQuestion implements Question {
	type = QuestionType.MultipleChoice;
	description: string;
	options: string[];

	constructor(description: string, options: string[]) {
		this.description = description;
		this.options = options;
	}

	print(): void {
		console.log(this.description);
		this.options.forEach((option, i) => console.log(`${i + 1}. ${option}`));
	}
}

class TextAnswerQuestion implements Question {
	type = QuestionType.TextAnswer;
	description: string;

	constructor(description: string) {
		this.description = description;
	}

	print(): void {
		console.log(this.description);
		console.log('Answer: ______________');
	}
}

const questions: Question[] = [
	new BooleanQuestion('Coding is fun.'),
	new MultipleChoiceQuestion('How many years have you coded?', ['1 year', '2 years', '3 years']),
	new TextAnswerQuestion('What was your favorite project?'),
];

printQuestions(questions);
