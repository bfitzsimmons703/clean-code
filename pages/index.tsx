import Link from 'next/link';
import path from 'path';
import fs from 'fs';

interface PageLink {
	href: string;
	title: string;
}

interface PageProps {
	tutorials: PageLink[];
	sources: PageLink[];
}

const upperCaseWord = (word: string): string => word[0].toUpperCase() + word.slice(1);

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

	const tutorials: PageLink[] = getFilesRecursively(dir)
		.filter((file) => file.endsWith('.mdx'))
		.map((file) => {
			const href = file.split('.')[0].slice(1); //remove extension and starting slash
			const title = href.split('-').map(upperCaseWord).join(' ');
			return {
				href,
				title,
			};
		});

	const sources: PageLink[] = [
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

	const props: PageProps = { tutorials, sources };
	return { props };
};

const Home = ({ tutorials, sources }: PageProps) => {
	return (
		<div>
			<p>Tutorials:</p>
			<ul>
				{tutorials.map((link) => (
					<li key={link.href}>
						<Link href={`/${link.href}`}>
							<a>{link.title}</a>
						</Link>
					</li>
				))}
			</ul>

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
