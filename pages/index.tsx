import Link from 'next/link';
import path from 'path';
import { DirectoryParser } from '../lib/DirectoryParser';
import { FileParser } from '../lib/FileParser';
import { FileParserFactory } from '../lib/FileParserFactory';
import { UTF8FileParser } from '../lib/UTF8FileParser';
import { upperCaseWord } from '../utils/upperCaseWord';

interface TutorialLink {
	href: string;
	title: string;
}

interface PageProps {
	tutorialGroups: [string, TutorialLink[]][];
	sources: { href: string; title: string }[];
}

const TUTORIAL_FILE_EXTENSION = '.mdx';

export const getStaticProps = async () => {
	const tutorialsBaseDirectory = path.join(process.cwd(), 'pages/');
	const dirParser = new DirectoryParser(tutorialsBaseDirectory);
	const tutorialFilepaths = dirParser
		.getFlattenedDirectoryFilepaths(tutorialsBaseDirectory)
		.filter((file) => file.endsWith(TUTORIAL_FILE_EXTENSION));

	const tutorialGroups = new Map<string, TutorialLink[]>();
	for (const tutorialRelativePath of tutorialFilepaths) {
		const tutorialFileParser: FileParser = FileParserFactory.getFileParserByEncoding('utf8', tutorialsBaseDirectory, tutorialRelativePath);

		const tutorialFileLines = tutorialFileParser.getFileLines();

		const title = tutorialFileLines[0].replace('#', '').trim(); //the first line of every MDX file is the title, marked by a `#`
		const href = tutorialRelativePath.replace(TUTORIAL_FILE_EXTENSION, ''); //In next.js, links mirror the folder structure under `pages/`

		const hrefParts = href.split('/');
		const group = hrefParts[0].split('-').map(upperCaseWord).join(' '); //just setting the uppermost parent directory as the "group" for now

		const tutorials = tutorialGroups.get(group) || [];
		tutorials.push({ href, title });

		tutorialGroups.set(group, tutorials);
	}

	const props: PageProps = {
		//Next.js can't serialize Maps, so converting to an array
		tutorialGroups: Array.from(tutorialGroups),
		sources: [
			{
				href: 'https://a.co/d/bMGqyFY',
				title: 'Clean Code by Robert C. Martin',
			},
			{
				href: 'https://a.co/d/5kQ1CV0',
				title: 'Clean Architecture by Robert C. Martin',
			},
			{
				href: 'https://www.amazon.com/Software-Development-Principles-Patterns-Practices/dp/0135974445/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=1664469726&sr=8-1',
				title: 'Agile Software Development, Principles, Patterns, and Practices by Robert C. Martin',
			},
			{
				href: 'https://refactoring.guru/',
				title: 'Refactoring.guru',
			},
			{
				href: 'https://www.youtube.com/playlist?list=PLF206E906175C7E07',
				title: 'Design Patterns Video Tutorial by Derek Banas',
			},
			{
				href: 'https://www.digitalocean.com/community/tutorials/gangs-of-four-gof-design-patterns',
				title: 'Gang of Four Design Patterns by DigitalOcean',
			},
		],
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
