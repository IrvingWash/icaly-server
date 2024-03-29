import { EnvExtractor } from 'src/utils/env-extractor';
import { CommonGamesCapability } from '../game-db/capabilities/common-games-capability';
import { GameDB } from '../game-db/game-db';
import { Game } from '../game-db/game-db-objects-and-constants';
import { IGDBGamesCapability } from './capabilities/igdb-games-capability';
import { IGDBAuthenticator, IIGDBAuthenticator } from './igdb-authenticator';
import { IGDBFetch, makeIGDBFetch } from './igdb-fetch';
import { IGDBRequestEnvironment, IIGDBRequestEnvironment } from './igdb-request-environment';
import { IGDBTransport, IIGDBTransport } from './igdb-transport';

export class IGDB implements GameDB {
	private readonly _baseURL = 'https://api.igdb.com/v4/';
	private readonly _clientID = EnvExtractor.igdbClientID;
	private readonly _clientSecret = EnvExtractor.igdbClientSecret;
	private _igdbFetch!: IGDBFetch;

	private readonly _requestEnvironment: IIGDBRequestEnvironment;
	private readonly _authenticator: IIGDBAuthenticator;
	private _transport!: IIGDBTransport;
	private _gamesCapability!: CommonGamesCapability;

	public constructor() {
		this._requestEnvironment = new IGDBRequestEnvironment(
			this._baseURL,
			this._clientID,
			this._clientSecret
		);

		this._authenticator = new IGDBAuthenticator(this._requestEnvironment.authenticateRequestMetaInfo());
	}

	public async init(): Promise<void> {
		const authResult = await this._authenticator.authenticate();

		this._igdbFetch = makeIGDBFetch(this._clientID, authResult.access_token);

		this._transport = new IGDBTransport(this._igdbFetch, this._requestEnvironment);

		this._gamesCapability = new IGDBGamesCapability(this._transport);
	}

	public async getGames(): Promise<Game[]> {
		return this._gamesCapability.getGames();
	}
}
