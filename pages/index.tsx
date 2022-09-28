import Link from 'next/link';
import path from 'path';
import { DirectoryParser } from '../lib/DirectoryParser';
import { FileParser } from '../lib/FileParser';
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
	const tutorialFilepaths = dirParser.getDirectoryFilepaths(tutorialsBaseDirectory).filter((file) => file.endsWith(TUTORIAL_FILE_EXTENSION));

	const tutorialGroups = new Map<string, TutorialLink[]>();
	for (const tutorialRelativePath of tutorialFilepaths) {
		const tutorialFile = new FileParser(tutorialsBaseDirectory, tutorialRelativePath);
		const tutorialFileLines = tutorialFile.getFileLines();

		const title = tutorialFileLines[0].replace('#', '').trim(); //the first line of every MDX file is the title, marked by a `#`
		const href = tutorialRelativePath.replace(TUTORIAL_FILE_EXTENSION, ''); //In next.js, links mirror the folder structure

		const hrefParts = href.split('/');
		const group = hrefParts[0].split('-').map(upperCaseWord).join(' ');

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
				href: 'https://refactoring.guru/',
				title: 'Refactoring.guru',
			},
			{
				href: 'https://www.youtube.com/playlist?list=PLF206E906175C7E07',
				title: 'Design Patterns Video Tutorial by Derek Banas',
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
