import { NextPage } from 'next';
import { useEffect } from 'react';

const HomePage: NextPage = () => {
	useEffect(() => {
		window.location.assign(process.env.NEXT_PUBLIC_DEFAULT_URL);
	}, []);

	return <></>;
};

export default HomePage;
