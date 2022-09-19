import { readdirSync } from 'fs';
import Link from 'next/link';
import path from 'path';

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
	const files = readdirSync(dir);
	const pageLinks: PageLink[] = await Promise.all(
		files
			.filter((file) => file.endsWith('.mdx'))
			.map(async (file) => {
				const href = file.split('.')[0];
				const title = href.split('-').map(upperCaseWord).join(' ');

				return {
					href,
					title,
				};
			})
	);

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
