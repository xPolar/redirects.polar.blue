import { GetServerSideProps, NextPage } from 'next';
import { APIEmbed } from 'discord-api-types/v10';
import mongo from '../utils/mongo';
import { useEffect } from 'react';
import Head from 'next/head';

interface RedirectPageProps {
	redirectTo?: string;
	embed?: APIEmbed;
}

const RedirectPage: NextPage<RedirectPageProps> = ({ redirectTo, embed }) => {
	useEffect(() => {
		window.location.assign(redirectTo || process.env.NEXT_PUBLIC_DEFAULT_URL);
	}, []);

	return (
		<Head>
			<meta key="description" name="description" content={embed?.description} />
			<meta key="og:url" property="og:url" content={embed?.url} />\
			<meta key="og:title" property="og:title" content={embed?.title} />
			<meta key="og:description" property="og:description" content={embed?.description} />
			<meta key="og:image" property="og:image" content={embed?.thumbnail?.url} />
			<meta name="twitter:card" content={embed?.image?.url} />
			<meta name="theme-color" content={`#${embed?.color?.toString(16)}`} />
		</Head>
	);
};

export default RedirectPage;

export const getServerSideProps: GetServerSideProps<RedirectPageProps> = async ({
	resolvedUrl
}) => {
	const path = resolvedUrl.split('?')[0];

	await mongo.connect();

	const document = await mongo.db('data').collection('redirects').findOne({ path });

	return {
		props: {
			redirectTo: document?.redirectTo || null,
			embed: document?.embed || null
		}
	};
};
