import Link from 'next/link';
import { CSSProperties } from 'react';

interface Props {
	children: React.ReactNode;
}

const headerFooterStyles: CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '4rem',
};

export default function AppLayout({ children }: Props) {
	return (
		<div>
			<header
				style={{
					borderBottom: '1px solid black',
					...headerFooterStyles,
				}}
			>
				<div>
					<Link href='/'>
						<a>Clean Code - TypeScript</a>
					</Link>
				</div>
			</header>
			<main style={{ minHeight: '80vh', padding: '1rem' }}>{children}</main>
			<footer
				style={{
					borderTop: '1px solid black',
					...headerFooterStyles,
				}}
			>
				<div>
					Made with ❤️ by <a href='https://github.com/bfitzsimmons703'>Brian Fitzsimmons</a>
				</div>
			</footer>
		</div>
	);
}
