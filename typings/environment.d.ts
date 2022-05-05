declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			NEXT_PUBLIC_DEFAULT_URL: string;
			MONGO_URI: string;
		}
	}
}

export {};
