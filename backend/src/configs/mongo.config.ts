import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';
export const getMongoConfig = async (
	configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongostring(configService),
		...getMongoOptions(),
	};
};
const getMongoString = (configService: ConfigService) => 'mongodb://' + 'localhost:27017';
// configService.get('MONGO_LOGIN') +
// ':' +
// configService.get('MONGO_PASSWORD') +
// '@' +
// configService.get('MONGO_HOST') +
// ':' +
// configService.get('MONGO_PORT') +
// '/' +
// configService.get('MONGO_AUTHDATABASE');

const getMongoOptions = () => ({
	useNewUrlParser: true,
	// useCreateIndex: true,
	useUnifiedTopology: true,
});
