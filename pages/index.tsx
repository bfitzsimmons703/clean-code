import Link from 'next/link';
import path from 'path';
import fs, { readFileSync } from 'fs';
import { upperCaseWord } from '../utils/upperCaseWord';

interface TutorialLink {
	href: string;
	title: string;
}

interface PageProps {
	tutorialGroups: [string, TutorialLink[]][];
	sources: TutorialLink[];
}

export const getStaticProps = async () => {
	const dir = path.join(process.cwd(), 'pages');

	const getFilesRecursively = (directory: string): string[] => {
		const files: string[] = [];

		const filesInDirectory = fs.readdirSync(directory);
		for (const file of filesInDirectory) {
			const absolute = path.join(directory, file);
			if (fs.statSync(absolute).isDirectory()) {
				files.push(...getFilesRecursively(absolute));
			} else {
				files.push(absolute.replace(dir, ''));
			}
		}

		return files;
	};

	const tutorialGroups = new Map<string, TutorialLink[]>();
	getFilesRecursively(dir)
		.filter((file) => file.endsWith('.mdx'))
		.forEach((file) => {
			const href = file.split('.')[0].slice(1); //remove extension and starting slash
			const filePath = path.join(dir, file);
			const fileContents = readFileSync(filePath, 'utf8');
			const fileLines = fileContents.split('\n');
			const title = fileLines[0].replace('#', ''); //the first line of every MDX file is the title, marked by a `#`

			const hrefParts = href.split('/');
			const group = hrefParts[0].split('-').map(upperCaseWord).join(' ');

			const tutorials = tutorialGroups.get(group) || [];
			tutorials.push({ href, title });

			tutorialGroups.set(group, tutorials);
		});

	const sources: TutorialLink[] = [
		{
			href: 'https://a.co/d/bMGqyFY',
			title: 'Clean Code by Robert C. Martin',
		},
		{
			href: 'https://a.co/d/5kQ1CV0',
			title: 'Clean Architecture by Robert C. Martin',
		},
		{
			href: 'https://refactoring.guru/',
			title: 'Refactoring.guru',
		},
		{
			href: 'https://www.youtube.com/playlist?list=PLF206E906175C7E07',
			title: 'Design Patterns Video Tutorial by Derek Banas',
		},
	];

	const props: PageProps = {
		//Next.js can't serialize Maps, so converting to an array
		tutorialGroups: Array.from(tutorialGroups),
		sources,
	};
	return { props };
};

const Home = ({ tutorialGroups, sources }: PageProps) => {
	return (
		<div>
			{tutorialGroups.map(([groupName, tutorialLinks]) => (
				<div key={groupName}>
					<h4>{groupName}</h4>
					<ul>
						{tutorialLinks.map((link) => (
							<li key={link.href}>
								<Link href={`/${link.href}`}>
									<a>{link.title}</a>
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}

			<hr />
			<p>Sources:</p>
			<ul>
				{sources.map((link) => (
					<li key={link.href}>
						<a href={link.href} target='_blank' rel='noreferrer'>
							{link.title}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
