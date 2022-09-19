import Link from 'next/link';
import path from 'path';
import fs from 'fs';

interface PageLink {
	href: string;
	title: string;
}

interface PageProps {
	pageLinks: PageLink[];
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

	const pageLinks: PageLink[] = getFilesRecursively(dir)
		.filter((file) => file.endsWith('.mdx'))
		.map((file) => {
			const href = file.split('.')[0].slice(1); //remove extension and starting slash
			const title = href.split('-').map(upperCaseWord).join(' ');
			return {
				href,
				title,
			};
		});

	const props: PageProps = { pageLinks };
	return { props };
};

const Home = ({ pageLinks }: PageProps) => {
	return (
		<div>
			<ul>
				{pageLinks.map((link) => (
					<li key={link.href}>
						<Link href={`/${link.href}`}>
							<a>{link.title}</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
